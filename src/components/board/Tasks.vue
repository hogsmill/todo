<template>
  <div>
    <Task v-for="(task, index) in tasks" :key="index" :status="status" :task="task" />
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  components: {
    Task
  },
  props: [
    'status'
  ],
  computed: {
    tasks() {
      return this.$store.getters.getTasks
    }
  }
}
</script>
