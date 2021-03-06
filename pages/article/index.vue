
<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">
  
        <!--        标题-->
        <h1>{{ article.title }}</h1>
  
       <article-meta :article="article" />
  
      </div>
    </div>
  
    <div class="container page">
  
      <div class="row article-content">
<!--        文章内容-->
        <div class="col-md-12" v-html="article.body">
         {{ article.body }}
        </div>
      </div>
  
      <hr />
  
<!--      文章信息-->
      <div class="article-actions">
        <article-meta :article="article" />
      </div>
  
<!--      文章评论-->
      <article-comments :article="article" />
      
  
    </div>
  
  </div>
</template>

<script>
import { getArticleDetailApi } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from '@/pages/article/article-meta'
import ArticleComments from '@/pages/article/article-comments'

export default {
  middleware: 'authenticated',
  name: 'Article',
  components: { ArticleComments, ArticleMeta  },
  directives: {  },
  data() {
    return {
    
    };
  },
  async asyncData ({ params }) {
    const res = await getArticleDetailApi(params.slug)
    const { data: { article } } = res
    // {                                                                                                                                                                                                                01:16:49
    //   title: '测试',
    //     slug: '-tb5g8r',
    //   body: '开始你的表演',
    //   createdAt: '2021-02-27T15:19:59.026Z',
    //   updatedAt: '2021-02-27T15:19:59.026Z',
    //   tagList: [],
    //   description: '文章简介',
    //   author: {
    //   username: 'ma0dong',
    //     bio: null,
    //     image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    //     following: false
    // },
    //   favorited: false,
    //     favoritesCount: 2
    // }
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  methods: {
  
  },
};
</script>

<style lang="scss" scoped>

</style>
