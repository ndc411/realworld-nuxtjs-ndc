<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
  
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>
  
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
  
          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi, registerApi } from '../../api/user'

// 仅在客户端
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'noAuthenticated',
  name: 'Login',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  components: {  },
  directives: {  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {} // 错误信息
    };
  },
  mounted() {
  
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求
        const { data } = this.isLogin ? await loginApi({
          user: this.user
        }) : await registerApi({
          user: this.user
        })
        
        // 保存用户的登录状态
        this.$store.commit('setUser', data.user)
        
        // 防止页面刷新数据丢失，需要将数据持久化
        Cookie.set('user', data.user)
        
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        console.dir(err)
        this.errors = err.response.data.errors
      }
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
