<template>
  <div>
    <div v-if="scope == 'apps'">
      <TaskApps v-for="(task, index) in tasks" :key="index" :status="status" :filter="filter" :task="task" :urgent="urgent" />
    </div>
    <div v-if="scope == 'personal'">
      <TaskPersonal v-for="(task, index) in tasks" :key="index" :status="status" :filter="filter" :task="task" :urgent="urgent" />
    </div>
  </div>
</template>

<script>
import TaskApps from './TaskApps.vue'
import TaskPersonal from './TaskPersonal.vue'

export default {
  components: {
    TaskApps,
    TaskPersonal,
  },
  props: [
    'status',
    'filter',
    'urgent'
  ],
  computed: {
    scope() {
      return this.$store.getters.getScope
    },
    tasks() {
      return this.$store.getters.getTasks
    }
  }
}
</script>
