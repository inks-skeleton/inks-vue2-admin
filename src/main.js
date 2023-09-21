import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import site from './config'
import './permission'

// 全局样式
import './assets/styles/index.scss'
import './assets/iconfont/iconfont.css'

// UI框架
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.prototype.$api = api
Vue.prototype.$site = site


const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (process.env.NODE_ENV === 'development') {
  window.__currentApp = vue
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = vue.constructor
  console.log('%c[api] --api列表--↓↓↓', 'color:#4188f2;')
  console.dir(api)

  console.log('%c[config] --站点配置--↓↓↓', 'color:#4188f2;')
  console.dir(site)

  console.log('%c[routes] --路由列表--↓↓↓', 'color:#4188f2;')
  console.dir(router.options.routes)

  console.log('%c[store] --store state--↓↓↓', 'color:#4188f2;')
  console.dir(store._modules.root.state)

  console.log('%c[store] --store actions--↓↓↓', 'color:#4188f2;')
  console.dir(store._actions)
}
