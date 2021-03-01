import Vue from 'vue'
import App from './App.vue'

/* assets */
import './assets/css/common.css'

/* utils */
import './utils/classList.js'

/* directives */
import directives from './directives/directive.js'
Vue.use(directives)

Vue.config.productionTip = false

import TDetail from '../dist/vue-tdetail.umd.js'
Vue.use(TDetail)

new Vue({
  render: h => h(App),
}).$mount('#app')
