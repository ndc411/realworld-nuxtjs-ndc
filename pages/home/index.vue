<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">首页</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  
    <div class="container page">
      <div class="row">
  
        <div class="col-md-9">
          <!--导航栏-->
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab === 'your_feed'}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab === 'global_feed'}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab === 'tagTab'}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tagTab',
                      tag: tag
                    }
                  }"
                >#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
  
          <!--文章简介列表-->
          <articles-list :articles="this.articles" />
        </div>
  
        <!--标签列表-->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                :to="{name: 'home', query: { tag: item, tab: 'tagTab' }}"
                v-for="item in tags" :key="item"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
        
        <!--分页-->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{ active: page === item }"
              v-for="item in totalPage"
              :key="item">
              <nuxt-link
                class="page-link"
                :to="{ name: 'home', query: { page: item, tag: $route.query.tag, tab: tab }}">
                {{ item }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
  
      </div>
    </div>
  
  </div>
</template>

<script>
import {
  getArticlesApi, getFeedArticlesApi,
  addFavoriteApi, deleteFavoriteApi
} from '../../api/article'
import { getTagsApi } from '../../api/tag'
import { mapState } from 'vuex'
import ArticlesList from '@/components/articles-list'

export default {
  name: 'Home',
  components: { ArticlesList  },
  directives: {  },
  // asyncData 中接收上下文参数对象，可以解构query--查询字符串参数对象
  async asyncData({ query, store }) {
    // 页面
    const page = Number.parseInt(query.page || 1) // 取的的值是字符串，要转类型，否则运算会有问题
    const limit = 20
    const { tag, tab } = query
    const getArticlesList = store.state.user && tab === 'your_feed' ? getFeedArticlesApi : getArticlesApi
    const [ articlesRes, tagsRes ] = await Promise.all([
      getArticlesList({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTagsApi()
    ])
    const { articles, articlesCount } = articlesRes.data
    articles.favoriteDisable = false // 点赞按钮默认可以用
    const { tags } = tagsRes.data
    return {
      articles,
      articlesCount,
      // 放到这里才能在computed中访问
      limit,
      page,
      tags,
      tag,
      tab: tab || 'global_feed'
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      // 向上取整
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
