import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// // require styles 导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

import axios from 'axios'
//配置请求登录路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//在挂载之前可以为axios设置一个拦截器，相当于是axios请求的预处理，给它添加token信息
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {//这里的request就是请求拦截器，用use搭载拦截器
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')//为请求头对象使用Authorization进行添加
  // 在最后必须 return config
  return config//请求对象
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios//这样vue和组件的实例对象都可以访问axios


Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
