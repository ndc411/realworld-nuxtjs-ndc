/**
 Created by dechuan on 2021/02/25 00
 */
import { request } from '../plugins/request'

// 获取公共文章列表
export const getArticlesApi = params => {
  return request({
    method: 'get',
    url: '/articles',
    params
  })
}

// Feed Articles 获取关注的用户文章列表
export const getFeedArticlesApi = params => {
  return request({
    method: 'get',
    url: '/articles/feed',
    params
  })
}

// Favorite Article
// POST /api/articles/:slug/favorite
//
// Authentication required, returns the Article
// No additional parameters required

// 添加点赞
export const addFavoriteApi = slug => {
  return request({
    method: 'post',
    url: `/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavoriteApi = slug => {
  return request({
    method: 'delete',
    url: `/articles/${slug}/favorite`
  })
}

// Get Article
export const getArticleDetailApi = slug => {
  return request({
    method: 'get',
    url: `/articles/${slug}`
  })
}

// Create Article 创建文章
// POST /api/articles
export const addArticleApi = data => {
  return request({
    method: 'post',
    url: '/articles',
    data
  })
}

// Update Article
// PUT /api/articles/:slug
export const updateArticleApi = data => {
  return request({
    method: 'put',
    url: `/articles/${data.slug}`,
    data
  })
}

// Delete Article
// DELETE /api/articles/:slug
export const deleteArticleApi = slug => {
  return request({
    method: 'delete',
    url: `/articles/${slug}`,
  })
}

// Get Comments from an Article
export const getArticleCommentApi = slug => {
  return request({
    method: 'get',
    url: `/articles/${slug}/comments`
  })
}

// Add Comments to an Article
// POST /api/articles/:slug/comments
export const addCommentApi = data => {
  return request({
    method: 'post',
    url: `/articles/${data.slug}/comments`,
    data
  })
}

// Delete Comment
// DELETE /api/articles/:slug/comments/:id
export const deleteCommentApi = ({ slug, id }) => {
  return request({
    method: 'delete',
    url: `/articles/${slug}/comments/${id}`,
  })
}
