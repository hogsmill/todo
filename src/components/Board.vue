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
          Done
          <i v-if="!doneExpanded" class="fas fa-caret-down" />
          <i v-if="doneExpanded" class="fas fa-caret-up" />
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
          <Tasks :status="'Done'" />
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
      doneExpanded: false
    }
  },
  methods: {
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
