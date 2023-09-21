import {locals} from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: locals.get('sidebarStatus') ? !!+locals.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        locals.set('sidebarStatus', 1)
      } else {
        locals.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      locals.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    toggleSideBar ({commit}) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({commit}, {withoutAnimation}) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice ({commit}, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}
