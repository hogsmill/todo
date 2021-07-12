<template>
  <table class="board" border>
    <thead>
      <tr>
        <th>
          To Do
        </th>
        <th>
          In Progress
        </th>
        <th>
          Done ({{ doneTasks }})
          <i v-if="!showDone" class="fas fa-eye" @click="expand()" />
          <i v-if="showDone" class="fas fa-eye-slash" @click="collapse()" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <Tasks :status="'To Do'" />
        </td>
        <td>
          <Tasks :status="'Doing'" />
        </td>
        <td>
          <Tasks v-if="showDone" :status="'Done'" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import bus from '../socket.js'

import Tasks from './board/Tasks.vue'

export default {
  components: {
    Tasks
  },
  data() {
    return {
      showDone: false
    }
  },
  computed: {
    doneTasks() {
      return this.$store.getters.getDoneTasks
    }
  },
  methods: {
    expand() {
      this.showDone = true
    },
    collapse() {
      this.showDone = false
    }
  }
}
</script>

<style lang="scss">
  .board {
    width: 80%;
    margin: 0 auto;

    td {
      width: 33%;
      vertical-align: top;
    }
  }
</style>
