import $api from '@/api'
import {getToken, setToken, removeToken} from '@/config'
import {resetRouter} from '@/router'
import {sessions} from '@/utils/storage'

const userInfo = sessions.get('userInfo') || {}

export default {
  namespaced: true,
  state: {
    token: getToken(),
    username: userInfo.username,
    avatar: userInfo.avatar || require('@/assets/images/avatar.gif'),
    introduction: '',
    roles: []
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.token = userInfo.token
      state.username = userInfo.username
      state.introduction = userInfo.introduction // 提示文字
      state.roles = userInfo.roles
      if (userInfo.avatar) state.avatar = userInfo.avatar
    },
  },
  actions: {
    // 登录
    login ({commit}, userInfo) {
      const {username, password} = userInfo
      return new Promise(resolve => {
        $api.user.login({
          username: username.trim(),
          password: password
        }).then(res => {
          if (!res.status || !res.data) return resolve()
          commit('SET_USER', res.data)
          setToken(res.data.token)
          sessions.set('userInfo', {
            username: res.data.username,
            avatar: res.data.avatar
          })
          resolve('/')
        })
      })
    },
    // 退出登录
    logout ({commit, dispatch}) {
      commit('SET_USER', {})
      removeToken()
      resetRouter()
      sessions.remove('userInfo')
      dispatch('tagsView/delAllViews', null, {root: true})
    }
  }
}
