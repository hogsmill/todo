import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentTab: 'product',
    statuses: [
      'To Do',
      'Doing',
      'Done'
    ],
    apps: [
      'General/Agile Simulations',
      'Assessment',
      'Battleships',
      'Coin Game',
      'Context Switching',
      'Death Start Builder',
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
        'Kanban Playground',
        'Billy Bonkers'
      ]
    },
    currentApp: null,
    currentAppType: null,
    productTasks: [],
    marketingTasks: [],
    productDoneTasks: 0,
    marketingDoneTasks: 0
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
      return state.currentTab == 'marketing' ? state.marketingTasks : state.productTasks
    },
    getDoneTasks: (state) => {
      return state.currentTab == 'marketing' ? state.marketingDoneTasks : state.productDoneTasks
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
      const product = []
      const marketing = []
      state.tasks = payload
      let productDone = 0
      let marketingDone = 0
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].marketing) {
          marketing.push(state.tasks[i])
          if (state.tasks[i].status == 'Done') {
            marketingDone = marketingDone + 1
          }
        } else {
          product.push(state.tasks[i])
          if (state.tasks[i].status == 'Done') {
            productDone = productDone + 1
          }
        }
      }
      state.productTasks = product
      state.marketingTasks = marketing
      state.productDoneTasks = productDone
      state.marketingDoneTasks = marketingDone
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
