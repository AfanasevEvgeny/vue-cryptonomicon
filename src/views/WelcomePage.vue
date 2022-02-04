<template>
  <div class="main-grid">
    <div class="main-title">
      <title-layout/>
    </div>
    <div class="main-description">
      <description-layout/>
    </div>
    <div class="weather">
      <weather-layout/>
    </div>
    <div class="crypto">
      <crypto-layout/>
    </div>
  </div>
</template>

<script>


import TitleLayout from "../layouts/WelcomePage/TitleLayout";
import WeatherLayout from "../layouts/WelcomePage/WeatherLayout";
import CryptoLayout from "../layouts/WelcomePage/CryptoLayout";
import DescriptionLayout from "../layouts/WelcomePage/DescriptionLayout";

export default {
  name: "WelcomePage",
  components: {DescriptionLayout, CryptoLayout, WeatherLayout, TitleLayout}
}
</script>

<style scoped>

.main-grid > div {
  border-radius: 4px;
  overflow: hidden;
}

.main-grid {
  min-width: 100%;
  height: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: calc(70% - 20px) 30%;
  grid-template-rows: calc(10% - 40px) 45% 45%;
}

.main-title {
  font-size: 1em;
  display: inline-block;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

.main-description {
  background: #28353DFF;
  display: inline-block;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}

.weather {
  background: #28353DFF;
  display: inline-block;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;

}

.crypto {
  background: #28353DFF;
  display: inline-block;
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}

</style>