import Vue from 'vue'

import 'normalize.css/normalize.css' // 样式重置

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // 全局 css

import App from '@/App'
import store from '@/store'
import router from '@/router'

// import '@/init' // 初始化

import '@/icons' // icon
import '@/permission' // 权限控制
import elDragDialog from '@/directive/el-drag-dialog'
Vue.directive(elDragDialog)

import * as filters from '@/filters' // 全局 filters

Vue.use(Element, {
  size: 'medium' // 设置element-ui 默认大小
})

// 注册全局 filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
