import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import router from '@/router'
import {getToken} from '@/config'

const loginPath = '/login'
NProgress.configure({showSpinner: false})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // 拦截上一页面axios所有请求
  window.__axiosPromiseArr.forEach((ele, index) => {
    ele.cancel()
    window.__axiosPromiseArr.splice(index, 1)
  })

  // 登录鉴权
  const hasToken = getToken()
  const isLogged = to.meta && to.meta.authorize && to.meta.authorize.includes('logged')
  if (isLogged && !hasToken) {
    next(loginPath)
    NProgress.done()
    return
  }

  // 已登录跳转登录页重定向
  if (hasToken && to.path === loginPath) {
    next('/')
    NProgress.done()
    return
  }

  // 进入页面
  return next()
})

router.afterEach(() => {
  NProgress.done()
})
