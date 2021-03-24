import Vue from 'vue'
import App from './App.vue'
import router from '../router/router.js'
import store from '../store/index.js'
import vuetify from './plugins/vuetify';
import VueFriendlyIframe from 'vue-friendly-iframe';
// import VueIframe from 'vue-iframes'

// Vue.use(VueIframe)
Vue.config.productionTip = false;
Vue.use(VueFriendlyIframe);

new Vue({
  router,//追加
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

