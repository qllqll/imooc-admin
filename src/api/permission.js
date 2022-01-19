import request from '@/utils/request'

/**
 * 获取所有权限
 * @returns {*}
 */
export const permissionList = () => {
  return request({
    url: '/permission/list'
  })
}
