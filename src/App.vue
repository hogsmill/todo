<template>
  <div id="app">
    <Header />
    <h1>To Do - Agile Simulations</h1>
    <NewTask v-if="currentTab == 'new-task'" />
    <a v-if="currentTab == 'board'" target="blank" href="https://docs.google.com/spreadsheets/d/1hSoRxFervY317e6Z3P2Z1aK4RblAC6zBPrCiTw6J6PM/edit#gid=0">
      Death Star Builder Google doc
    </a>
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
