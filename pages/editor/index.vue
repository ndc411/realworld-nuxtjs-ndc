<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
  
        <errors-list :errors="errors" />
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" :disabled="isPublishing" @click="publish">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>
  import { addArticleApi, getArticleDetailApi, updateArticleApi } from '@/api/article'
import ErrorsList from '@/components/errors-list'

export default {
  // 在加载这个页面之前，会优先调用 authenticated.js 中的模块，
  // 根据模块的逻辑决定是否渲染当前页面
  middleware: 'authenticated',
  name: 'Editor',
  components: {ErrorsList  },
  directives: {  },
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      errors: {},
      isPublishing: false
    };
  },
  mounted() {
    if (this.$route.query.slug) {
      this.getArticleDetail()
    }
  },
  watchQuery: ['slug'],
  methods: {
    async publish () {
      const handleFn = this.$route.query.slug ? updateArticleApi : addArticleApi
      try {
        this.isPublishing = true
        const { data: { article } } = await handleFn({ article: this.article ,slug: this.$route.query.slug })
        const { slug } = article
        this.$router.push({ name: 'article', params: { slug }})
      } catch (err) {
        this.errors = err.response.data.errors
      }
      this.isPublishing = false
    },
    async getArticleDetail () {
      const { data: { article:{ title, description, body } } } = await getArticleDetailApi(this.$route.query.slug)
      this.article = {
        title, description, body
      }
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
