import VueRouter from "vue-router";

import AboutPage from "@/views/AboutPage";
import CryptoPage from "@/views/CryptoPage";
import WeatherPage from "@/views/WeatherPage";
import WelcomePage from "@/views/WelcomePage";


export default new VueRouter({
    routes: [
        {path: '/', component: WelcomePage},
        {path: '/about', component: AboutPage},
        {path: '/weather', component: WeatherPage},
        {path: '/crypto', component: CryptoPage},
    ]
})