<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-4">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" :class="{ active: currentTab == 'product' }">
          <a class="nav-link pointer" @click="setCurrentTab('product')">
            <span v-if="scope == 'apps'">Product</span>
            <span v-if="scope == 'personal'">Tasks</span>
          </a>
        </li>
        <li v-if="scope != 'personal'" class="nav-item" :class="{ active: currentTab == 'marketing' }">
          <a class="nav-link pointer" @click="setCurrentTab('marketing')">Marketing</a>
        </li>
        <li class="nav-item" :class="{ active: currentTab == 'new-task' }">
          <a class="nav-link pointer" @click="setCurrentTab('new-task')">New Task</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    currentTab() {
      return this.$store.getters.getCurrentTab
    },
    scope() {
      return this.$store.getters.getScope
    }
  },
  methods: {
    setCurrentTab(payload) {
      this.$store.dispatch('updateCurrentTab', payload)
    }
  }
}
</script>

<style lang="scss">
  nav {
    h1 {
      letter-spacing: initial;
      margin-left: 6px;
      font-weight: bold;
      text-shadow: 2px 2px 3px #444;
      font-size: xx-large;
      line-height: 1;
    }

    .feedback {
      letter-spacing: 0;
      color: #212529;
    }

    p.feedback-form {
      margin-bottom: 12px;
    }

    .feedback-form {
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
