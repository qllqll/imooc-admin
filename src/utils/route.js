import path from 'path'

/**
 * 所有的子集路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  //  查重操作
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]]') return true
}

/**
 * 根据routers数据，返回对应的menu规则数据
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  routes.forEach((item) => {
    //  不存在children && 不存meta 剔除
    if (isNull(item.children) && isNull(item.meta)) {
      return
    }
    // 存在children 不存在meta || 存在children 存在meta
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在children 存在meta 最终的menu需要进行跳转 需要合并path
    const routerPath = path.resolve(basePath, item.path)
    //  路由分离之后 可能会存在同名的父路由的情况
    let route = result.find((item) => item.path === routerPath)
    if (!route) {
      route = {
        ...item,
        path: routerPath,
        children: []
      }
      //  icon &&title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    //  存在children && 存在meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
