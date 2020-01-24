import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import router from './router'
import store from './store'


Vue.use(BootstrapVue)
Vue.config.productionTip = false

// event bus
export const EventBus = new Vue();



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
