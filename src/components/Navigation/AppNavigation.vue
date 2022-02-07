<template>
  <nav class="navigation-box-color">
    <router-link to="/"  active-class="link-active">
      <li style="text-decoration: none">
        <v-icon name="home" style="fill: #e8d9b5"/>
        Home
      </li>
    </router-link>
    <router-link to="/weather"  active-class="link-active">
      <li>
        <v-icon name="cloud" style="fill: #6dc5dc"/>
        Weather
      </li>
    </router-link>
    <router-link to="/crypto" active-class="link-active">
      <li>
        <v-icon name="coins" style="fill: #ffc600"/>
        Crypto
      </li>
    </router-link>
    <router-link to="/about"  active-class="link-active">
      <li>
        <v-icon name="user-tie" style="fill: #f9886c"/>
        About
      </li>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "AppNavigation"
}
</script>

<style scoped>
nav {
  display: flex;
}

nav li {
  margin: 0 0.7em;
}

.link-active{
  color: #56b881;

}

</style>