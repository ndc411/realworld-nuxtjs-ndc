<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">
  
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link
              v-if="user.username === $route.params.username"
              class="btn btn-sm btn-outline-secondary action-btn" to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button v-else class="btn btn-sm btn-outline-secondary action-btn"
                    @click="profile.following ? unfollowProfile() : followProfile()"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? 'Unfollow' : 'Follow' }} {{ $route.params.username }}
            </button>
          </div>
  
        </div>
      </div>
    </div>
  
    <div class="container">
      <div class="row">
  
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab !== 'favorited' }"
                  :to="{ name: 'profile' }">
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           :class="{ active: tab === 'favorited'}"
                           :to="{ name: 'profile', query: { tab: 'favorited' } }">
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>
  
          <!--文章简介列表-->
          <articles-list :articles="this.articles" />
  
        </div>
  
      </div>
    </div>
  
  </div>
</template>

<script>
import { getProfileUserInfoApi, followProfileApi, unfollowProfileApi } from '@/api/profile'
import { getArticlesApi } from '@/api/article'
import { mapState } from 'vuex'
import ArticlesList from '@/components/articles-list'

export default {
  middleware: 'authenticated',
  name: 'Profile',
  components: {ArticlesList },
  directives: { },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      profile: {},
      articles: [],
      tab: ''
    };
  },
  watchQuery: ['username'],
  mounted () {
    const username = this.$route.params.username
    this.getUserInfo(username)
    this.getMyArticles(username)
  },
  watch: {
    '$route' (to) {
      const username = to.path.replace('/profile/', '')
      console.log(to)
      this.getUserInfo(username)
      this.getMyArticles(username)
    }
  },
  query: ['tab'],
  methods: {
    async getUserInfo (username) {
      const { data: { profile } } = await getProfileUserInfoApi(username)
      this.profile = profile
    },
    async getMyArticles (username) {
      const params = { limit: 5, offset: 0 }
      if (!this.$route.query.tab) {
        console.log(122)
        params.author = username
      } else {
        params.favorited = username
      }
      const { data: { articles } } = await getArticlesApi(params)
      this.articles = articles
    },
    async followProfile () {
      const { data: { profile } } = await followProfileApi(this.profile.username)
      this.profile = profile
    },
    async unfollowProfile () {
      const { data: { profile } } = await unfollowProfileApi(this.profile.username)
      this.profile = profile
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
