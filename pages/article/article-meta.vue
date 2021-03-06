<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link to="" class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createAt | date('MMM DD,YYYY') }}</span>
    </div>
    <template v-if="article.author.username === user.username">
      <span >
        <nuxt-link
          class="btn btn-outline-secondary btn-sm"
          :to="{
            name: 'editor',
            query: { slug: article.slug }
          }"
        >
          <i class="ion-edit"></i> Edit Article
        </nuxt-link>
        <button class="btn btn-outline-danger btn-sm" :class="{disabled: isDeleting}" @click="deleteArticle">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" @click="handleFollow">
        <i class="ion-plus-round"></i>&nbsp;
        {{ article.author.following ? 'Unfollow' : 'Follow'  }} {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}" @click="handleFavorite">
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article<span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { deleteArticleApi, addFavoriteApi, deleteFavoriteApi } from '@/api/article'
  import { unfollowProfileApi, followProfileApi } from '@/api/profile'

  export default {
    name: 'article-meta',
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isDeleting: false
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      async deleteArticle () {
        await deleteArticleApi(this.article.slug)
        this.$router.replace('/')
      },
      async handleFollow () {
        const handleFn = this.article.author.following ? unfollowProfileApi : followProfileApi
        const { data: { profile } } = await handleFn(this.article.author.username)
        this.article.author.following = profile.following
      },
      async handleFavorite () {
        const handleFn = this.article.favorited ? deleteFavoriteApi : addFavoriteApi
        const { data: { article } } = await handleFn(this.article.slug)
        this.article = article
      }
    }
  }
</script>

<style scoped>

</style>
