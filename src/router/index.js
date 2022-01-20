import { createRouter, createWebHashHistory } from 'vue-router'
import UserManage from './modules/user-manage'
import RoleList from './modules/role-list'
import PermissionList from './modules/permission-list'
import ArticleCreate from './modules/article-create'
import Article from './modules/article'
import store from '@/store'
/**
 *  私有路由表
 */
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate
]

/**
 *  公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/layout/index'),
    redirect: '/profile',
    children: [
      //  个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      //  404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      //  401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
