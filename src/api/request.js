/**
 * author: 林欣
 * date: 2020.5.15
 * describe: axios请求封装
 */
import axios from 'axios'
import Router from '@/router'
import loading from '@/utils/loading'
import {Message} from 'element-ui'
import {getApiBaseUrl, proxyApiPathRewrite, reqHeaderToken, getToken} from '@/config'

const isDev = process.env.NODE_ENV === 'development'
window.__axiosPromiseArr = []
window.__axiosLoading = null

const service = axios.create({
  baseURL: '',
  timeout: 30000 // 请求超时时间
})

const isFunction = func => (func && typeof func === 'function')

service.interceptors.request.use(config => {
  const deploy = Object.assign({loading: true, tipMsg: true}, config)

  // 设置api地址及正确路径
  deploy.baseURL = getApiBaseUrl(deploy.url)
  deploy.url = proxyApiPathRewrite(deploy.url)

  // 拦截请求参数进行处理
  if (isFunction(deploy.beforeReq)) deploy.data = deploy.beforeReq(deploy.data)

  // 打开loading
  if (deploy.loading) window.__axiosLoading = loading.open()

  // 添加鉴权请求头
  const token = getToken()
  if (token) deploy.header[reqHeaderToken] = token

  // 为路由跳转拦截上一页面请求做准备
  deploy.cancelToken = new axios.CancelToken(cancel => {
    window.__axiosPromiseArr.push({cancel})
  })

  return deploy
}, error => ({status: 0, msg: error.message}))

// respone拦截器
service.interceptors.response.use(({config, status, data}) => {
  // 关闭loading
  if (config.loading && window.__axiosLoading) {
    window.__axiosLoading.close()
  }

  // 请求成功
  if (status === 200 && !data.status && config.tipMsg) Message.error(data.msg)

  // 拦截返回参数进行处理
  return (isFunction(config.afterReq)) ? config.afterReq(data) : data
}, error => {
  // 关闭loading
  if (window.__axiosLoading) window.__axiosLoading.close()

  // 请求报错
  if (error && error.response && error.response.status) {
    switch (error.response.status) {
    case 401:
      Message.error('抱歉，无访问权限，请先登录账号！')
      Router.replace('/user/login')
      break
    case 500:
      Message.error('服务器开小差了，请稍后重试！')
      break
    default:
      Message.error('网络链接失败，请检查您网络或稍后重试！')
      break
    }
  } else {
    Message.error('接口请求未知错误！')
  }

  // 开发调试
  if (isDev) console.log('error:', error)
})

export default service
