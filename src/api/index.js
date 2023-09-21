/**
 * author: 林欣
 * date: 2020.5.15
 * describe: api创建
 * use: this.$api.[modules名字去掉下划线].[api名]
 * example:
 *  this.$api.common.getAreaList().then(res=>{ // success }).catch(err=> // error)
 *  this.$api.elite.doAddVisitCard().then(res=>{ // success }).catch(err=> // error)
 */
import modeIn from '@/utils/modein'
import request from './request'

// 导入模块
const files = require.context('./modules/', true, /_\S*\.js/)
const apiAll = modeIn(files, 'object')

// 创建api请求函数
const api = {}
Object.keys(apiAll).forEach(mItem => {
  const m = apiAll[mItem]
  api[mItem] = {}
  Object.keys(m).map(aItem => {
    const a = m[aItem]
    api[mItem][aItem] = function (data) {
      // axios 请求
      switch (a.method) {
      case 'get': a.params = data
        break
      case 'post': a.data = data
      }
      return request(a)
    }
  })
})

export default api
