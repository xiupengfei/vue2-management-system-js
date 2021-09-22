import Vue from 'vue'

import 'normalize.css/normalize.css' // 样式重置
import '@/styles/index.scss' // 全局 css

import Element from 'element-ui'
// import './styles/element-variables.scss'

import App from '@/App'
import store from '@/store'
import router from '@/router'

import '@/icons' // icon
import '@/permission' // 权限控制
import permission from '@/directive/permission'

import * as filters from '@/filters' // 全局 filters

import { componentSize } from '@/settings'

// 注册全局 filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element, {
  size: componentSize // 设置默认大小 large| medium | small
})

// Vue.directive('permission', permission)
Vue.use(permission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
