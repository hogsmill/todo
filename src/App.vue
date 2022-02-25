<template>
  <div id="app">
    <Header />
    <h1>To Do - Agile Simulations</h1>
    <NewTask v-if="currentTab == 'new-task'" />
    <Board v-if="currentTab == 'product'" :marketing="false" />
    <Board v-if="currentTab == 'marketing'" :marketing="true" />
  </div>
</template>

<script>
import bus from './socket.js'

import params from './lib/params.js'

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
  computed: {
    currentTab() {
      return this.$store.getters.getCurrentTab
    }
  },
  created() {
    if (location.hostname == 'localhost') {
      let scope = params.getParam('scope')
      scope = scope ? scope : 'apps'
      this.$store.dispatch('updateScope', scope)
    } else {
      this.$store.dispatch('updateScope', process.env.VUE_APP_SCOPE)
    }

    bus.emit('sendGetTasks')

    bus.on('updateTasks', (data) => {
      this.$store.dispatch('updateTasks', data)
    })
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
