<template>
  <tr>
    <td>
      App Type
    </td>
    <td>
      <select v-if="appTypes[currentApp]" id="app-type-select" @change="setCurrentAppType()">
        <option value="">
          -- Select --
        </option>
        <option v-for="(appType, aindex) in appTypes[currentApp]" :key="aindex">
          {{ appType }}
        </option>
      </select>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
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
    setCurrentAppType() {
      const appType = document.getElementById('app-type-select').value
      this.$store.dispatch('updateCurrentAppType', appType)
    }
  }
}
</script>
