import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'
//配置请求登录路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//在挂载之前可以为axios设置一个拦截器，相当于是axios请求的预处理，给它添加token信息
axios.interceptors.request.use(config => {//这里的request就是请求拦截器，用use搭载拦截器
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')//为请求头对象使用Authorization进行添加
  // 在最后必须 return config
  return config//请求对象
})
Vue.prototype.$http = axios//这样vue和组件的实例对象都可以访问axios


Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
