import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentTab: 'board',
    statuses: [
      'To Do',
      'Doing',
      'Done'
    ],
    apps: [
      'Assessment',
      'Battleships',
      'Coin Game',
      'Context Switching',
      'No Estimates',
      'Pipeline Game'
    ],
    appTypes: {
      'Assessment': [
        '5 Dysfunctions',
        'Team Health Check'
      ],
      'Context Switching': [
        'BA Shouting'
      ],
      'No Estimates': [
        'Kanban Playground'
      ]
    },
    currentApp: null,
    currentAppType: null,
    tasks: [],
    doneTasks: 0
  },
  getters: {
    getCurrentTab: (state) => {
      return state.currentTab
    },
    getStatuses: (state) => {
      return state.statuses
    },
    getApps: (state) => {
      return state.apps
    },
    getAppTypes: (state) => {
      return state.appTypes
    },
    getCurrentApp: (state) => {
      return state.currentApp
    },
    getCurrentAppType: (state) => {
      return state.currentAppType
    },
    getTasks: (state) => {
      return state.tasks
    },
    getDoneTasks: (state) => {
      return state.doneTasks
    }
  },
  mutations: {
    updateCurrentTab: (state, payload) => {
      state.currentTab = payload
    },
    updateCurrentApp: (state, payload) => {
      state.currentApp = payload
    },
    updateCurrentAppType: (state, payload) => {
      state.currentAppType = payload
    },
    updateTasks: (state, payload) => {
      state.tasks = payload
      let done = 0
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].status == 'Done') {
          done = done + 1
        }
      }
      state.doneTasks = done
    }
  },
  actions: {
    updateCurrentTab: ({ commit }, payload) => {
      commit('updateCurrentTab', payload)
    },
    updateCurrentApp: ({ commit }, payload) => {
      commit('updateCurrentApp', payload)
    },
    updateCurrentAppType: ({ commit }, payload) => {
      commit('updateCurrentAppType', payload)
    },
    updateTasks: ({ commit }, payload) => {
      commit('updateTasks', payload)
    }
  }
})
