import Vue from 'vue'
import App from "@/App";
import VueRouter from "vue-router";
import router from './router/index'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('v-icon', Icon)


new Vue({
    render: h => h(App),
    el: '#app',
    comments: {'v-icon': Icon},
    router
}).$mount('#app')
