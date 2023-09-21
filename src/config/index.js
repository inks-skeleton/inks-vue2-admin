/**
 * 站点全局配置
 * 调用：this.$site.*
 */
import {sessions} from '@/utils/storage'

// API代理地址
const apiProxy = {
  prod: '',
  test: '',
  dev: '',
  mock: 'https://mock.lx.test.hcyan.cn/mock/5ea03a75f439060016f1744c/template'
}

// 获取API Base Url
export function getApiBaseUrl (url) {
  if (process.env.NODE_ENV === 'development') {
    const envList = Object.keys(apiProxy)
    const env = envList.find(s => url.indexOf(`{${s}}`) > -1)
    return apiProxy[env || 'dev']
  } else {
    return apiProxy.prod
  }
}

// 代理API路径重写
export function proxyApiPathRewrite (url) {
  const envList = Object.keys(apiProxy)
  const env = envList.find(s => url.indexOf(`{${s}}`) > -1)
  return env ? url.replace(`{${env}}`, '') : url
}

// 鉴权Token增、删、改、查
export const reqHeaderToken = 'Authorize'
export const setToken = val => sessions.set(reqHeaderToken, val)
export const getToken = () => sessions.get(reqHeaderToken)
export const removeToken = () => sessions.remove(reqHeaderToken)

// 路由模式及base配置
export const routeMode = 'history'
export const routeBase = '/'

export default {
  sitename: 'Lx vue管理后台模板',
  sitelogo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
  showSettings: true,
  tagsView: true,
  sidebarLogo: true, // 侧边栏是否显示LOGO
  fixedHeader: false, // 是否固定头部
  rightDropdownMenus: [ // 右侧下拉菜单
    {name: '消息中心', path: '/message'},
    {name: '码云', url: 'https://www.baidu.com/'},
    {name: 'Github', url: 'https://www.baidu.com/'},
  ],
  // 获取路由导航
  getNavRoutes () {
    const sidebarFirstName = 'home' // 侧边栏首个路由Name
    const routes = this.$router.options.routes
    const layout = routes.find(item => item.name === 'layout')
    const data = layout && layout.children ? layout.children : routes
    return data.sort((x, y) => (x.name == sidebarFirstName ? -1 : y.name == sidebarFirstName ? 1 : 0))
  }
}
