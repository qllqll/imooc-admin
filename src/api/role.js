import request from '@/utils/request'

export const roleList = () => {
  return request({
    url: 'role/list'
  })
}
