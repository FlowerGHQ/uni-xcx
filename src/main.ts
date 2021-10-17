import Vue from 'vue'
import App from './App.vue'

import store from './store'
import '@/styles/index.less'
import Vant from '@/plugins/vant'
import Logger from '@/plugins/sentry'

Vue.use(Vant)
Vue.use(Logger)
new Logger()

Vue.config.productionTip = false

Vue.prototype.$store = store

const app = new Vue({
  store,
  ...App
})
app.$mount()
