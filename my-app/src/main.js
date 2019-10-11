import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vant from 'vant'
Vue.config.productionTip = false
import 'vant/lib/index.css'
import 'lib-flexible'
import '../src/assets/css/reset.css'

Vue.use(vant)
Vue.prototype.$axios=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
