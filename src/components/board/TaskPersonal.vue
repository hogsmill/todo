<template>
  <div v-if="showTask(task)" class="task" :class="{ 'urgent': task.urgent }">
    <i v-if="showDetails" class="fas fa-caret-up details" @click="collapse()" />
    <i v-if="!showDetails" class="fas fa-caret-down details" @click="expand()" />
    <h4>
      <span v-if="!titleEditing">{{ task.title }}</span>
      <i class="fas fa-exclamation-circle" :class="{ 'is-urgent': task.urgent }" @click="toggleUrgent(task)" />
      <i v-if="!titleEditing" class="fas fa-edit" @click="editTitle()" />
      <input type="text" v-if="titleEditing" id="edit-title" :value="task.title">
      <i v-if="titleEditing" class="far fa-save" @click="saveTitle()" />
    </h4>
    <div v-if="showDetails">
      <button v-if="task.status != 'To Do'" class="btn btn-info" @click="moveLeft()">
        <i class="fas fa-long-arrow-alt-left" />
      </button>
      <button class="btn btn-info" @click="deleteTask()">
        Delete
      </button>
      <button class="btn btn-info" @click="cloneTask()">
        <i class="far fa-clone" title="Clone" />
      </button>
      <button v-if="task.status != 'Done'" class="btn btn-info" @click="moveRight()">
        <i class="fas fa-long-arrow-alt-right" />
      </button>
    </div>
  </div>
</template>

<script>
import bus from '../../socket.js'

export default {
  props: [
    'task',
    'status',
    'filter',
    'urgent'
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
    showTask(task) {
      let show = !!task.urgent == this.urgent
      if (task.status != this.status) {
        show = false
      } else {
        if (task.status == 'Done') {
          show = !this.filter || task.app == this.filter
        }
      }
      return show
    },
    expand() {
      this.showDetails = true
    },
    collapse() {
      this.showDetails = false
    },
    editTitle() {
      this.titleEditing = true
    },
    saveTitle() {
      const title = document.getElementById('edit-title').value
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'title', value: title})
      this.titleEditing = false
    },
    toggleUrgent() {
      bus.$emit('sendUpdateTask', {id: this.task.id, field: 'urgent', value: !this.task.urgent})
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
    },
    cloneTask() {
      bus.$emit('sendCloneTask', {id: this.task.id})
    }
  }
}
</script>

<style lang="scss">
  .task {
    border: 1px solid;
    margin: 6px;

    h4 {
      font-size: 1.25rem;
    }

    .details {
      color: #666;
      font-size: x-large;
      float: right;
    }

    #edit-description {
      width: 95%;
      height: 100px;
    }

    input {
      width: 80%;
    }

    .fa-exclamation-circle {
      margin-right: 2px;
    }

    .fa-edit, .fa-save, .fa-bug, .fa-exclamation-circle {
      margin-left: 2px;
      color: #aaa;

      &.is-urgent {
        color: red;
      }
    }
  }
</style>
