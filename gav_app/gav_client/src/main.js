import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

export const bus = new Vue()

bus.$data.instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000',
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');