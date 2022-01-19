import request from '@/utils/request'

/**
 * 获取用户列表数据
 * @param data
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

/**
 * 获取所有用户列表数据
 * @param data
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

/**
 * 获取所有用户详情
 * @param data
 */
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}

/**
 * 批量上传
 * @param data
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

/**
 * 删除用户
 * @param id
 * @returns {*}
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

/**
 * 获取指定用户的角色
 * @param id
 * @returns {*}
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

/**
 * 分配权限
 * @param id
 * @returns {*}
 */
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
