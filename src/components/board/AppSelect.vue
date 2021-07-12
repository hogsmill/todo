<template>
  <tr>
    <td>
      App
    </td>
    <td>
      <select id="app-select" @change="setCurrentApp()">
        <option value="">
          -- Select --
        </option>
        <option>
          All
        </option>
        <option v-for="(app, index) in apps" :key="index">
          {{ app }}
        </option>
      </select>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    apps() {
      return this.$store.getters.getApps
    }
  },
  methods: {
    setCurrentApp() {
      const app = document.getElementById('app-select').value
      this.$store.dispatch('updateCurrentApp', app)
    }
  }
}
</script>
