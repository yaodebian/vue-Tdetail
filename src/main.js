import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// import TDetail from '../dist/vue-tdetail.umd.js'
// Vue.use(TDetail)

new Vue({
  render: h => h(App),
}).$mount('#app')
