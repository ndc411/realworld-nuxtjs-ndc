<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
  
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <errors-list :errors="errors" />
          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.username"  class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="updateSeeting">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserApi, updateUserApi } from '@/api/user'
import ErrorsList from '@/components/errors-list'
export default {
  components: {ErrorsList},
  middleware: 'authenticated',
  name: 'Settings',
  data() {
    return {
      user: {},
      errors: {},
      password: null
    }
  },
  async mounted () {
    const { data: { user } } = await getUserApi()
    this.user = { ...user }
  },
  methods: {
    logout() {
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      this.$router.push('/')
    },
    async updateSeeting () {
      const user = {
        ...this.user
      }
      if (this.password) user.password = this.password
      try {
        const { data } = await updateUserApi({ user })
        this.$router.push({ name: 'profile', params: { username: this.user.username } })
      } catch (e) {
        // console.dir(e)
        this.errors = e.response.data.errors
      }
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
