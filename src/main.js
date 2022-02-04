import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import './assets/tailwind.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
