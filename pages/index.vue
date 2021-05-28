<template>
  <div class="container">
    <div class="nuxt-todo">Nuxt Todo Application</div>
    <ToDoList :todos="todos" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'magicauth',
  data() {
    return {
      todos: '',
    }
  },
  async asyncData({ store }) {
    try {
      const result = await axios.get('http://localhost:1337/todos', {
        headers: {
          Authorization: `Bearer ${store.state.didToken}`,
        },
      })
      return {
        todos: result.data,
      }
    } catch (error) {
      console.log('handle error')
    }
  },
}
</script>

<style scoped>
.nuxt-todo {
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
  padding-top: 20px;
  color: #6851ff;
}
</style>
