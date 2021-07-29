<template>
  <div>
    <table class="new-task" border>
      <tr>
        <td>
          Title
        </td>
        <td>
          <input type="text" id="task-name">
        </td>
      </tr>
      <TaskType />
      <AppSelect />
      <AppTypeSelect />
    </table>
    <button id="new-task-submit" class="btn btn-info" @click="addTask()">
      Add Task
    </button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import bus from '../socket.js'

import TaskType from './board/TaskType.vue'
import AppSelect from './board/AppSelect.vue'
import AppTypeSelect from './board/AppTypeSelect.vue'

export default {
  components: {
    TaskType,
    AppSelect,
    AppTypeSelect
  },
  computed: {
    apps() {
      return this.$store.getters.getApps
    },
    appTypes() {
      return this.$store.getters.getAppTypes
    },
    currentApp() {
      return this.$store.getters.getCurrentApp
    },
    currentAppType() {
      return this.$store.getters.getCurrentAppType
    },
  },
  methods: {
    addTask() {
      const title = document.getElementById('task-name').value
      const marketing = document.getElementById('marketing-task').checked
      const app = this.currentApp
      let appType
      if (this.currentApp) {
        appType = this.currentAppType
      }
      bus.$emit('sendAddTask', {title: title, app: app, appType: appType, marketing: marketing, status: 'To Do'})
      this.$store.dispatch('updateCurrentTab', 'product')
    }
  }
}
</script>

<style lang="scss">
  .new-task {
    width: 400px;
    margin: 0 auto;
  }
</style>
