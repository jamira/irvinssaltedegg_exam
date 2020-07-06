import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { currency } from './currency'

import './assets/scss/custom.scss'

Vue.use(VueAxios, axios)
Vue.filter('currency', currency)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
