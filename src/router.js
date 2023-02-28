import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
//可以用@代表src

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    //路由重定向：当输入http://localhost:8080/会自动重定向到/login地址，再自动跳转到login组件
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})
// // 挂载路由导航守卫,如果用户没有登录，但直接通过url访问特定页面，需要重新导航到登录页面
router.beforeEach((to, from, next) => {//before就叫作导航守卫
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router