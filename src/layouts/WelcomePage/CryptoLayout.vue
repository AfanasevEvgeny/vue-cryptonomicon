<template>
  <div class="crypto-wrapper">
    <div class="image-wrapper"></div>
    <div class="content-wrapper">
      <div>
        <h1>Track cryptocurrency.</h1>
      </div>
      <div>
        <p>Track your cryptocurrencies with helping of charts.</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "CryptoLayout"
}
</script>

<style scoped>
.crypto-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.content-wrapper {
  padding-left:2rem;
  padding-right:2rem;
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  flex-direction: column;
  color: #c2c0bf;
}

.image-wrapper {
  width: 50%;
  height: 100%;
  background-image:
      linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(24, 108, 86, 0.73)),
      url("../../assets/imgs/CriptoValute.jpg");
  background-size: cover;
}
</style>