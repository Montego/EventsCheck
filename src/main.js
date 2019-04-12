import Vue from 'vue'
import App from './App.vue'


import {store} from './store';
import {router} from './router/routes';
import VueSelect from 'vue-cool-select'

Vue.use(VueSelect, {
  theme: //'bootstrap'
  'material-design'
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
