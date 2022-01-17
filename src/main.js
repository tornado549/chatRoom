import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/iconfont.css'
import Router from 'vue-router'
import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'

Vue.use(Croppa)
Vue.config.productionTip = false
Vue.use(MintUI)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
