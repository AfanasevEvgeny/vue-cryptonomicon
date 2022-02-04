<template>
  <div class="weather-wrapper">
    <div class="content-wrapper">
      <div>
        <h1>Explore weather.</h1>
      </div>
      <div>
        <p style="margin-top:1rem">Get weather forecast and track the weather in your current city.</p>
      </div>
    </div>
    <div class="image-wrapper"></div>
  </div>
</template>

<script>
export default {
  name: "WeatherLayout"
}
</script>

<style scoped>
.weather-wrapper {
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
  justify-content: center;
  flex-direction: column;
  color: #c2c0bf;
}

.image-wrapper {
  width: 50%;
  height: 100%;
  background-image:
      linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(24, 108, 86, 0.73)),
      url("../../assets/imgs/Windy-Weather.jpeg");
  background-size: cover;
}
</style>