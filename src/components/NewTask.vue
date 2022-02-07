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
      <TaskType v-if="scope == 'apps'" />
      <AppSelect v-if="scope == 'apps'" />
      <AppTypeSelect v-if="scope == 'apps'" />
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
    scope() {
      return this.$store.getters.getScope
    },
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
      const marketing = scope == 'apps' ? document.getElementById('marketing-task').checked : false
      const app = this.currentApp
      let appType
      if (this.currentApp && scope == 'apps') {
        appType = this.currentAppType
      }
      bus.$emit('sendAddTask', {title: title, app: app, appType: appType, marketing: marketing, status: 'To Do'})
      this.$store.dispatch('updateCurrentTab', marketing ? 'marketing' : 'product')
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
