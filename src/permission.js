import router from '@/router'
import store from '@/store'

// 白名单 用户不登录也可以进入
const whiteList = ['/login']

/**
 *路由前置守卫
 * to 要到那里去
 * from 你从哪里去
 * next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    //  用户已经登录 不允许进去login
    if (to.path === '/login') {
      next('/')
    } else {
      //  判断用户资料是否存在,如果不存在则获取用户信息
      if (!store.getters.hasUserInfo) {
        // await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    //  用户未登录 只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
