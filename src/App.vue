<template>
  <div id="app">
    <Header />
    <h1>To Do - Agile Simulations</h1>
    <NewTask v-if="currentTab == 'new-task'" />
    <Board v-if="currentTab == 'board'" />
  </div>
</template>

<script>
import bus from './socket.js'

import Header from './components/Header.vue'
import Board from './components/Board.vue'
import NewTask from './components/NewTask.vue'

export default {
  name: 'App',
  components: {
    Header,
    Board,
    NewTask,
  },
  created() {
    bus.$emit('sendGetTasks')
    
    bus.$on('updateTasks', (data) => {
      this.$store.dispatch('updateTasks', data)
    })
  },
  computed: {
    currentTab() {
      return this.$store.getters.getCurrentTab
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  table {
    width: 80%;
    margin: 0 auto;
  }
</style>
