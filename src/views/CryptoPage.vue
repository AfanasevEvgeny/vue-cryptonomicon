<template>
  <div class="main-grid">
    <div class="form__group field">
      <input v-model="ticker" @keypress.enter="!isTickerExists?add():''" type="input" class="form__field"
             placeholder="Name" name="name"
             id='name' required/>
      <label for="name" class="form__label">Add ticker</label>
      <button @click="add"
              :disabled="isTickerExists"
              class="search-btn"
              :class="{'search-btn-disabled':isTickerExists}"
      > {{
          isTickerExists ? 'This ticker already in list' : 'Add'
        }}
      </button>
    </div>
    <div v-if="tickers.length" class="tickers-container">
      <div class="tickers-list-container">
        <div class="tickers-list">
          <div
              v-for="(ticker, idx) in paginatedTickers"
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
        <div class="tickers-pagination-container">
          <input v-model="filter" class="filter-input" type="text"/>
          <div v-if="tickers.length>3">
            <v-icon v-if="page>1" @click="page-=1" name="arrow-left"/>
            <v-icon v-if="hasNextPage" @click="page+=1" name="arrow-right"/>
          </div>
        </div>
      </div>
      <div>
        <currency-graph :chart-data="chartData"/>
      </div>
    </div>
    <div v-else style="margin-top: 6px">No tickers yet..</div>
  </div>
</template>
CH
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
      cryptoHistory: [],
      filter: '',
      page: 1,
    }
  },
  methods: {
    getDateFormatted() {
      let now = new Date()
      return now.toISOString().substring(0, 10)
    },
    updateChart() {
      //todo издержки chart js? как обновить данные не обновляя объект
      this.chartData = {
        labels: this.cryptoHistory.map(histData => histData.date),
        datasets: [
          {
            label: 'Coin',
            backgroundColor: "#56b881",
            data: this.cryptoHistory.map(histData => histData.price)
          }
        ]
      }
    },
    startUpdateTicker(ticker) {
      setInterval(async () => {
        const priceResponse = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${ticker.name}&tsyms=USD&api_key=d56ef7d84fa09a856cedfb2f5a0731f3838ac135f25676d5740e4b39cb17d816`)
        ticker.price = priceResponse.data.USD > 1 ? priceResponse.data.USD.toFixed(2) : priceResponse.data.USD.toPrecision(2)
        if (ticker.name === this.sel?.name) {
          this.cryptoHistory.push({price: ticker.price, date: this.getDateFormatted()})
        }
      }, 5000)
    },
    add() {
      const newTicker = {
        name: this.ticker,
        price: 0
      }
      this.tickers.push(newTicker)
      this.startUpdateTicker(newTicker)
      this.ticker = ''
    },
    selectTicker(ticker) {
      this.sel = ticker
    },
    handleDelete(tickerToDelete) {
      this.tickers = this.tickers.filter(ticker => ticker.name !== tickerToDelete.name)
      if (tickerToDelete === this.sel) {
        this.sel = null
      }
    },
    updateURLSearch() {
      this.$router.push({
        query: {
          page: this.page.toString(),
          filter: this.filter.toString(),
        }
      }).catch(() => {
      })
    },
  },
  watch: {
    filter() {
      this.page = 1
    },
    cryptoHistory() {
      this.updateChart()
    },
    sel(val) {
      if (!val) {
        this.sel = null
      }
      this.cryptoHistory = []
    },
    tickers() {
      localStorage.setItem('cryptonomicon-tickers', JSON.stringify(this.tickers))
    },
    paginatedTickers() {
      if (this.paginatedTickers.length === 0 && this.page > 1) {
        this.page = this.page - 1
      }
    },
    pageStateOptions(){
      this.updateURLSearch()
    }
  },
  computed: {
    hasNextPage() {
      return this.filteredTickers.length > 3 * this.page
    },
    paginatedTickers() {
      const start = 3 * (this.page - 1)
      const end = 3 * this.page
      return this.filteredTickers.slice(start, end)
    },
    filteredTickers() {
      return this.tickers.filter(ticker => ticker.name.toLowerCase().includes(this.filter.toLowerCase()))
    },

    isTickerExists() {
      return this.tickers.find(ticker => ticker.name.toLowerCase() === this.ticker.toLowerCase())
    },
    pageStateOptions() {
      return {
        page: this.page,
        filter: this.filter
      }
    }
  },
  created() {
    this.tickers = localStorage.getItem('cryptonomicon-tickers') ? JSON.parse(localStorage.getItem('cryptonomicon-tickers')) : []
    this.tickers.forEach(ticker => this.startUpdateTicker(ticker))
    try {
      this.filter = this.$route.query.filter ? this.$route.query.filter : ''
      this.page = this.$route.query.page ? this.$route.query.page : 1
    } catch (e) {
      return {}
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

.tickers-pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tickers-pagination-container svg {
  fill: #56b881;
  margin: 6px;
  cursor: pointer;
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

.filter-input {
  background: none;
  padding: 14px 20px;
  color: white;
  border: 1px solid #56b881;
  border-radius: 4px;
}

// rest
.search-btn {
  background-color: $primary;
  color: white;
  padding-left: 16px;
  padding-right: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.search-btn:hover {
  background-color: #56b881;
}

.search-btn-disabled {
  background-color: #f9886c;
  cursor: default;
}

.search-btn-disabled:hover {
  background-color: #f9886c;
  cursor: default;
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