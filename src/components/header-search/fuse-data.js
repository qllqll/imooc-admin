import path from 'path'
import i18n from '@/i18n'
/**
 *赛选出可提供搜索的路由对象
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  //  创建数据
  let res = []

  for (const route of routes) {
    //  穿件包含path 和title 的item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    //  当前存在meta时，使用i18n进行国家化解析,组合成新的title
    //  动态路由不允许被检索
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }

    //  存在children 时，迭代进行处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }

  return res
}
