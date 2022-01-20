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
        const { permission } = await store.dispatch('user/getUserInfo')
        //  处理用户权限，需要筛选出需要添加的路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        //  循环添加对应的动态路由
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        //  添加玩动态路由之后，需要进行主动跳转
        return next(to.path)
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
