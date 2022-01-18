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
