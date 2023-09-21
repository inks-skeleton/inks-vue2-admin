/**
 * author: 林欣
 * date: 2020.5.15
 * describe: vue路由创建
 */
import Vue from 'vue'
import Router from 'vue-router'
import {routeMode, routeBase} from '@/config'
import modeIn from '@/utils/modein'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

// 导入模块
const files = require.context('./modules/', true, /_\S*\.js/)
const layoutModule = modeIn(files, 'array')

// 任何角色皆可访问
export const constantRoutes = [
  // 重定向
  {path: '*', redirect: '/404', replace: true},
  // 404页
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/home/404.vue')
  },
  // 用户登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue')
  },
  // 框架页
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    children: layoutModule
  }
]

// 注册路由
Vue.use(Router)

const createRouter = () => new Router({
  mode: routeMode || 'hash',
  base: routeBase || '/',
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

// 实例化路由
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
