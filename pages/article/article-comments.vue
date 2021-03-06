<template>
  <div class="row">
    
    <div class="col-xs-12 col-md-8 offset-md-2">
      
      <form class="card comment-form">
        <div class="card-block">
          <textarea v-model="myComment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img :src="article.author.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" :disabled="isAdding" @click.prevent="addMyComment">
            Post Comment
          </button>
        </div>
      </form>
      
      <div class="card" v-for="(comment, index) in comments" :key="comment.id">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: comment.author.username
              }
            }"
            class="comment-author"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link :to="{
              name: 'profile',
              params: {
                username: comment.author.username
              }
            }" class="comment-author">{{ comment.author.username }}
          </nuxt-link>
          <span class="date-posted">{{ comment.createdAt | date('MMM DD,YYYY') }}</span>
          <span class="mod-options" v-if="user.username === comment.author.username" @click="deleteComment(comment.id, index)">
            <i class="ion-trash-a"></i>
          </span>
        </div>
      </div>
    
    </div>
  
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { addCommentApi, deleteCommentApi, getArticleCommentApi } from '@/api/article'

  export default {
    name: 'ArticleComments',
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        comments: [],
        myComment: '',
        isAdding: false
      }
    },
    computed: {
      ...mapState(['user'])
    },
    mounted() {
      this.getArticleComments()
    },
    methods: {
      async getArticleComments () {
        const { data } = await getArticleCommentApi(this.article.slug)
        this.comments = data.comments
      },
      async addMyComment () {
        if (!this.myComment) {
          alert("comment can't be blank")
          return
        }
        this.isAdding = true
        const params = {
          comment: { body: this.myComment },
          slug: this.article.slug
        }
        const { data: { comment }  } = await addCommentApi(params)
        this.comments.push(comment)
        this.myComment = ''
        this.isAdding = false
      },
      async deleteComment (id, index) {
        console.log(id, index)
        await deleteCommentApi({ id, slug: this.article.slug })
        this.comments.splice(index, 1)
      }
    }
  }
</script>

<style scoped>

</style>
