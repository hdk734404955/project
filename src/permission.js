//权限拦截
import router from '@/router'
import store from '@/store' //引入store实例,和组件中的this.$store一样
import nProgress from 'nprogress' //引入进度条
import 'nprogress/nprogress.css' //引入进度条样式
const whiteList = ['/login', '/404'] //定义白名单
//前置守卫
router.beforeEach(async (to, from, next) => {
  nProgress.start() //开启进度条
  if (store.getters.token) { //判断有无token
    if (to.path === '/login') { //判断是否为登录页
      next('/') //跳到主页
    } else {
      if (!store.getters.userId) { //判断vuex中有无用户资料，有就不用获取
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) { //判断是否在白名单
      next()
    } else {
      next('/login')
    }

  }
  nProgress.done() //解决手动进入地址时进度条不关闭问题
})
//后置守卫
router.afterEach(() => {
  nProgress.done() //关闭进度条
})
