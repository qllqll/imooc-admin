import request from '@/utils/request'

/**
 * 获取所有角色
 * @returns {*}
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取当前角色对应的权限
 */
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 为角色分配权限
 */
export const roleDistributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
