<template>
  <div class="main-grid">
    <div class="form__group field">
      <input v-model="ticker" @keypress.enter="add" type="input" class="form__field" placeholder="Name" name="name"
             id='name' required/>
      <label for="name" class="form__label">Add ticker</label>
      <button @click="add" class="search-btn">Search</button>
    </div>
    <div v-if="tickers.length" class="tickers-container">
      <div class="tickers-list-container">
        <div class="tickers-list">
          <div
              v-for="(ticker, idx) in tickers"
              :key="idx"
              @click="selectTicker(ticker)"
              :class="{
                'tickers-list-item-selected':sel===ticker
              }"
              class="tickers-list-item"
          >
            <div>
              <div>
                <h3>
                  {{ ticker.name }} - USD
                </h3>
              </div>
              <div style="margin-top: 12px">
                <h4>
                  {{ ticker.price }}$
                </h4>
              </div>
            </div>
            <span>
                <v-icon @click.stop="handleDelete(ticker)" name="trash" style="fill: #f9886c"/>
            </span>
          </div>
        </div>
        <div>
          arrows
        </div>
      </div>
      <div>
        <currency-graph :chart-data="chartData"/>
      </div>
    </div>
    <div v-else style="margin-top: 6px">No tickers yet..</div>
  </div>
</template>

<script>
import axios from 'axios'
import CurrencyGraph from "@/components/CurrencyGraph";

export default {
  name: "CryptoPage",
  components: {CurrencyGraph},
  data() {
    return {
      ticker: '',
      tickers: [],
      sel: null,
      chartData: {},
      cryptoHistory: []
    }
  },
  methods: {
    getDateFormatted() {
      let now = new Date()
      return now.toISOString().substring(0, 10)
    },
    updateChart() {
      this.chartData = {
        labels: this.cryptoHistory.map(histData => histData.date),
        datasets: [
          {
            label: this.sel.name,
            backgroundColor: "#56b881",
            data: this.cryptoHistory.map(histData => histData.price)
          }
        ]
      }
    },
    add() {
      const newTicker = {
        name: this.ticker,
        price: 0
      }
      this.tickers.push(newTicker)
      setInterval(async () => {
        const priceResponse = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${newTicker.name}&tsyms=USD`)
        newTicker.price = priceResponse.data.USD > 1 ? priceResponse.data.USD.toFixed(2) : priceResponse.data.USD.toPrecision(2)
        if (newTicker.name === this.sel?.name) {
          this.cryptoHistory.push({price: newTicker.price, date: this.getDateFormatted()})
          this.updateChart()
        }
      }, 3000)
      this.ticker = ''
    },
    selectTicker(ticker) {
      this.sel = ticker
      this.cryptoHistory = []
    },
    handleDelete(tickerToDelete) {
      this.tickers = this.tickers.filter(ticker => ticker.name !== tickerToDelete.name)
    },
  },
  watch: {
    sel() {
      this.updateChart()
    }
  }
}
</script>

<style scoped lang="scss">

$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;

.main-grid {
  display: grid;
  min-width: 100%;
  height: 100%;
  grid-template-rows: 10% 90%;
  //gap: 20px;
  //display: grid;
  //grid-template-columns: calc(70% - 20px) 30%;
  //grid-template-rows: calc(10% - 40px) 45% 45%;
}

.tickers-container {
  display: grid;
  grid-template-columns: calc(50% - 20px) 50%;
  padding-top: 20px;
  gap: 20px;
}

.tickers-list-container {
  display: grid;
  grid-template-rows: 90% 10%;
}

.tickers-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tickers-list-item {
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 25%;
  background-color: rgb(40, 53, 61, .5);
  justify-content: space-around;
  text-align: center;
  box-sizing: border-box;
  //align-items: center;
  border-radius: 4px;
  cursor: pointer;
}

.tickers-list-item-selected {
  border: 1px solid #56b881;
}

.tickers-list-item h3 {
  color: whitesmoke;
}

.tickers-list-item h4 {
  color: #56b881;
}

.tickers-list-item h4 {
  margin: 6px;
}

.tickers-list-item li {
  text-decoration: none;
}

// rest
.search-btn {
  background-color: $primary;
  color: white;
  padding: 14px 20px;
  margin-left: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.search-btn:hover {
  background-color: #56b881;
}


// form

.form__group {
  position: relative;
  display: flex;
  padding: 15px 0 0;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}

.form__field:focus {
  ~ .form__label {
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }

  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}

/* reset input */
.form__field {
  &:required, &:invalid {
    box-shadow: none;
  }
}
</style>