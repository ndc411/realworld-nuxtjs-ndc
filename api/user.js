/**
 Created by dechuan on 2021/02/24 00
 */
import { request } from '../plugins/request'

// 登录
export const loginApi = data => {
  return request({
    method: 'POST',
    url: '/users/login',
    data
  })
}

// 注册
export const registerApi = data => {
  return request({
    method: 'POST',
    url: '/users',
    data
  })
}

// 获取用户信息
export const getUserApi = () => {
  return request({
    method: 'get',
    url: '/user',
  })
}

// 修改用户
export const updateUserApi = data => {
  return request({
    method: 'PUT',
    url: '/user',
    data
  })
}



