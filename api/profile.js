/**
 Created by dechuan on 2021/03/03 16
 */
import { request } from '../plugins/request'

// 获取用户信息
export const getProfileUserInfoApi = username => {
  return request({
    method: 'get',
    url: `/profiles/${username}`,
  })
}

// follow
export const followProfileApi = username => {
  return request({
    method: 'post',
    url: `/profiles/${username}/follow`,
  })
}

// unfollow
export const unfollowProfileApi = username => {
  return request({
    method: 'delete',
    url: `/profiles/${username}/follow`,
  })
}

