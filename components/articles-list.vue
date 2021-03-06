<template>
  <!--文章简介列表-->
  <div>
    <div class="article-preview" v-for="article in articles" :key="article.slug">
      <div class="article-meta">
        <nuxt-link
          :to="{
                    name: 'profile',
                    params: { username: article.author.username }
                  }"
        >
          <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link
            class="author"
            :to="{
                      name: 'profile',
                      params: { username: article.author.username }
                    }"
          >
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{ active: article.favorited }"
          :disabled="article.favoriteDisable"
          @click="handleFavorite(article)"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link :to="{
                name: 'article',
                params: { slug: article.slug }
              }" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import { addFavoriteApi, deleteFavoriteApi } from '@/api/article'

  export default {
    name: 'ArticlesList',
    props: {
      articles: {
        required: true,
        default: []
      }
    },
    data() {
      return {}
    },
    methods: {
      async handleFavorite(article) {
        article.favoriteDisable = true // 按钮不可再次点击
        try {
          if (article.favorited) {
            await deleteFavoriteApi(article.slug)
            article.favorited = false
            article.favoritesCount += -1 // 喜欢次数减一
          } else {
            article.favorited = true
            await addFavoriteApi(article.slug)
            article.favoritesCount += 1
          }
        } catch (err) {
          this.$router.push('login')
        }
        
        article.favoriteDisable = false // 按钮恢复可以点击
      }
    }
  }
</script>

<style scoped>

</style>
