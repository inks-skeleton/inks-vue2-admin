import variables from '@/assets/styles/element-variables.scss'
import $site from '@/config'

const {showSettings, tagsView, fixedHeader, sidebarLogo} = $site

export default {
  namespaced: true,
  state: {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  },
  mutations: {
    CHANGE_SETTING: (state, {key, value}) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting ({commit}, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}
