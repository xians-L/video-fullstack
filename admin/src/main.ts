import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import EleForm from 'vue-ele-form'
import './plugins/element'
import router from './router'

Vue.use(EleForm)

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3300'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
