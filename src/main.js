// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import Axios from 'axios'
import VueAxios from 'vue-axios'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
// import $ from 'jquery'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

// import Vuex from 'vuex'
import store from './store/store'

Vue.use(Vant);
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  // error:'./static/error.png',
  // loading:'./static/loading.png'
})
Vue.use(VueAxios,Axios);
Vue.config.productionTip = false
Vue.prototype.HOST = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
