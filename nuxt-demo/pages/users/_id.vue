<template>
  <div class="user">
    <h3>{{ data.name }}</h3>
    <h4>@{{ data.username }}</h4>
    <p>Email : {{ data.email }}</p>
    <p>
      <NuxtLink to="/">
        List of users
      </NuxtLink>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  validate({ params }) {
    return !isNaN(+params.id)
  },
  async asyncData({ params, error }) {
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${+params.id}`)
      console.log(data)
      return { data: data }
    } catch (e) {
      error({ message: 'User not found', statusCode: 404 })
    }
  }
}
</script>

<style scoped>
.user {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
