<template>
  <ul class="error-messages">
    <template v-for="(messages, field) in errors">
      <li v-for="(message, index) in messages" :key="index">
        {{ field }} {{ message }}
      </li>
    </template>
  </ul>
</template>

<script>
  export default {
    name: 'ErrorsList',
    props: {
      errors: {
        default: {},
        required: false
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped>

</style>
