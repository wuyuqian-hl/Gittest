import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import Directive from './components/Height/directive'
Vue.config.productionTip = false
Vue.use(Directive)
Vue.prototype.$http = axios
// axios.defaults.baseURL = '/api'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
