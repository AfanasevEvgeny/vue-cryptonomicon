<template>
  <v-icon v-if="lightMode===false"
          :spin="isHover"
          class="theme-switcher"
          name="sun"
          style="fill: #ffcc00"
          @mouseover="isHover=true"
          @mouseleave="isHover=false"
          @click="lightMode=true"
  />
  <v-icon v-else
          class="theme-switcher"
          :spin="isHover"
          name="moon"
          style="fill: #4ca2da"
          @mouseover="isHover=true"
          @mouseleave="isHover=false"
          @click="lightMode=false"
  />
</template>

<script>
export default {
  name: "ThemeSwitcher",
  data() {
    return {
      lightMode: false,
      isHover: false,
    }
  },
  mounted() {
    let bodyElement = document.body;
    bodyElement.classList.add("app-background");
    let htmlElement = document.documentElement
    if (this.lightMode) {
      localStorage.setItem("theme", 'light');
      htmlElement.setAttribute('theme', 'light');
    } else {
      localStorage.setItem("theme", 'dark');
      htmlElement.setAttribute('theme', 'dark');
    }
  },
  watch: {
    lightMode() {
      let htmlElement = document.documentElement
      if (this.lightMode) {
        localStorage.setItem("theme", 'light');
        htmlElement.setAttribute('theme', 'light');
      } else {
        localStorage.setItem("theme", 'dark');
        htmlElement.setAttribute('theme', 'dark');
      }
    }
  }
}
</script>

<style scoped>
.theme-switcher {
  cursor: pointer;
}
</style>