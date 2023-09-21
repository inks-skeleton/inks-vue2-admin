import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import modeIn from '@/utils/modein'

// 导入模块
const files = require.context('./modules/', true, /_\S*\.js/)
const storeModeles = modeIn(files, 'object')

Vue.use(Vuex)
export default new Vuex.Store({
  modules: storeModeles,
  getters
})

Vue.use(Vuex)
