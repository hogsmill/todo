<template>
  <div v-if="showTask(task)" class="task" :class="getClass()">
    <i v-if="showDetails" class="fas fa-caret-up details" @click="collapse()" />
    <i v-if="!showDetails" class="fas fa-caret-down details" @click="expand()" />
    <h4>
      <span v-if="!titleEditing">{{ task.title }}</span>
      <i v-if="!titleEditing" class="fas fa-edit" @click="editTitle()" />
      <input type="text" v-if="titleEditing" id="edit-title" :value="task.title">
      <i v-if="titleEditing" class="far fa-save" @click="saveTitle()" />
      <i class="fas fa-bug" @click="toggleBug()" />
    </h4>
    <div v-if="!showDetails">
      <span v-if="task.appType">{{ task.appType }}</span>
      <span v-if="!task.appType">{{ task.app }}</span>
    </div>
    <div v-if="showDetails">
      <p v-if="!descriptionEditing">
        {{ task.description }}
      </p>
      <i v-if="!descriptionEditing" class="fas fa-edit" @click="editDescription()" />
      <textarea v-if="descriptionEditing" id="edit-description" :value="task.description" />
      <i v-if="descriptionEditing" class="far fa-save" @click="saveDescription()" />
    </div>
    <table v-if="showDetails">
      <tr>
        <td>
          App
          <i v-if="!appEditing" class="fas fa-edit" @click="editApp()" />
          <i v-if="appEditing" class="far fa-save" @click="saveApp()" />
        </td>
        <td>
          <span v-if="!appEditing">
            {{ task.app }}
          </span>
          <AppSelect v-if="appEditing" />
        </td>
      </tr>
      <tr v-if="appTypes[task.app]">
        <td>
          App Type
          <i v-if="!appTypeEditing" class="fas fa-edit" @click="editAppType()" />
          <i v-if="appTypeEditing" class="far fa-save" @click="saveAppType()" />
        </td>
        <td>
          <span v-if="!appTypeEditing">
            {{ task.appType }}
          </span>
          <AppTypeSelect v-if="appTypeEditing" />
        </td>
      </tr>
    </table>
    <div v-if="showDetails">
      <button v-if="task.status != 'To Do'" class="btn btn-info" @click="moveLeft()">
        <i class="fas fa-long-arrow-alt-left" />
      </button>
      <button class="btn btn-info" @click="deleteTaskTask()">
        Delete
      </button>
      <button v-if="task.status != 'Done'" class="btn btn-info" @click="moveRight()">
        <i class="fas fa-long-arrow-alt-right" />
      </button>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

import AppSelect from './AppSelect.vue'
import AppTypeSelect from './AppTypeSelect.vue'

export default {
  components: {
    AppSelect,
    AppTypeSelect
  },
  components: {
    AppSelect,
    AppTypeSelect
  },
  props: [
    'task',
    'status',
    'filter'
  ],
  data() {
    return {
      showDetails: false,
      titleEditing: false,
      descriptionEditing: false,
      appEditing: false,
      appTypeEditing: false
    }
  },
  computed: {
    statuses() {
      return this.$store.getters.getStatuses
    },
    appTypes() {
      return this.$store.getters.getAppTypes
    },
    currentApp() {
      return this.$store.getters.getCurrentApp
    },
    currentAppType() {
      return this.$store.getters.getCurrentAppType
    }
  },
  methods: {
    getClass() {
      let str = this.task.status.replace(/\s/g, '-')
      if (this.task.bug) {
        str = str + ' bug'
      }
      return str
    },
    showTask(task) {
      let show = true
      if (task.status != this.status) {
        show = false
      } else {
        if (task.status == 'Done') {
          show = !this.filter || task.app == this.filter
        }
        console.log(task, filter, show)
      }
      return show
    },
    expand() {
      this.showDetails = true
    },
    collapse() {
      this.showDetails = false
    },
    toggleBug() {
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'bug', value: !this.task.bug})
    },
    editTitle() {
      this.titleEditing = true
    },
    saveTitle() {
      const title = document.getElementById('edit-title').value
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'title', value: title})
      this.titleEditing = false
    },
    editDescription() {
      this.descriptionEditing = true
    },
    saveDescription() {
      const description = document.getElementById('edit-description').value
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'description', value: description})
      this.descriptionEditing = false
    },
    editApp() {
      this.appEditing = true
    },
    saveApp() {
      const app = this.currentApp
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'app', value: app})
      this.appEditing = false
    },
    editAppType() {
      this.appTypeEditing = true
    },
    saveAppType() {
      const appType = this.currentAppType
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'appType', value: appType})
      this.appTypeEditing = false
    },
    moveLeft() {
      const status = this.statuses.indexOf(this.task.status) - 1
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'status', value: this.statuses[status]})
    },
    moveRight() {
      const status = this.statuses.indexOf(this.task.status) + 1
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'status', value: this.statuses[status]})
    },
    deleteTask() {
      bus.$emit('sendDeleteTask', {id: this.task.id})
    }
  }
}
</script>

<style lang="scss">
  .task {
    border: 1px solid;
    margin: 6px;

    .details {
      color: #666;
      font-size: x-large;
      float: right;
    }

    #edit-description {
      width: 95%;
      height: 100px;
    }

    &.bug {
      background-color: #fab9b4;
    }

    input {
      width: 80%;
    }

    .fa-edit, .fa-save, .fa-bug {
      margin-left: 2px;
      color: #aaa;
    }
  }
</style>
