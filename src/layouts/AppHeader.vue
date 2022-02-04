<template>
  <header class="main header-background-color">
    <div class="logo-wrapper">
      <app-logo/>
    </div>
    <div style="display: flex">
      <app-navigation/>
      <theme-switcher style="margin-left:2.4em"/>
    </div>
  </header>
</template>

<script>
import ThemeSwitcher from "../components/Options/ThemeSwitcher";
import AppNavigation from "../components/Navigation/AppNavigation";
import AppLogo from "../components/Logos/AppLogo";

export default {
  name: "AppHeader",
  components: {AppLogo, AppNavigation, ThemeSwitcher},
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top:0rem;
  padding: 0.8rem 1.6rem;
}

.logo-wrapper {
  border: 1px solid $logo-border;
  padding: 0.6em;
  box-sizing: border-box;
}
</style>