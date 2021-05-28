<template>
  <div class="todo-container">
    <div class="create-container">
      <input
        v-model="newToDo"
        type="text"
        class="todo-input"
        placeholder="What needs to be done?"
        v-on:keyup.enter="create"
      />
      <button @click="create">Add</button>
    </div>
    <div class="todo-list-container">
      <ToDoListItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    todos: {
      default() {
        return []
      },
    },
  },
  data() {
    return {
      newToDo: '',
    }
  },
  methods: {
    async create() {
      try {
        if (this.newToDo && this.newToDo.length > 0) {
          const result = await axios.post(
            'http://localhost:1337/todos',
            {
              todoTitle: this.newToDo,
              completed: false,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.didToken}`,
              },
            }
          )
          this.$router.push('/loading')
        }
        this.newToDo = ''
      } catch (error) {
        console.log('handle error')
      }
    },
  },
}
</script>

<style>
.todo-container {
  max-width: 550px;
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 0 0 25px rgb(0 0 0 / 15%);
  overflow: hidden;
}

.create-container {
  display: flex;
}

.todo-input {
  -webkit-box-flex: 1;
  flex-grow: 1;
  border: none;
  padding: 16px;
  font-size: 24px;
  font-weight: 100;
  color: rgb(77, 77, 77);
}

input:focus {
  outline: none;
}

input::placeholder {
  color: #6f8297;
  font-style: italic;
}

button {
  font-size: 22px;
  color: #6e6e6e;
  padding: 0 27px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
button:disabled {
  opacity: 0;
  pointer-events: none;
}

.todo-list-container {
  width: 550px;
  margin: auto;
  display: block;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
