import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faEyeSlash } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRight)
library.add(faEyeSlash)
Vue.component('font-awesome-icon', FontAwesomeIcon)


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons) 

Vue.config.productionTip = false
import axios from 'axios';

axios.defaults.baseURL = 'https://server3t.herokuapp.com';
//axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
