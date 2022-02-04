<template>
  <div id="app" class="main-container">
    <app-header/>
    <div class="content-container">
      <router-view/>
    </div>
    <app-footer/>
  </div>
</template>

<script>

import AppHeader from "./layouts/AppHeader";
import AppFooter from "./layouts/AppFooter";

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-container {
  padding: 1.6rem;
  flex: 1;
  display: flex;
  align-items: stretch;
}
</style>
