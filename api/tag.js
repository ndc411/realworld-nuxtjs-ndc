/**
 Created by dechuan on 2021/02/25 00
 */
import { request } from '../plugins/request'

// 获取文章标签列表
export const getTagsApi = () => {
  return request({
    method: 'get',
    url: '/tags',
  })
}
