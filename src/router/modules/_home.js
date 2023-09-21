export default [
  // 首页
  {
    path: '/home',
    name: 'home',
    meta: {authorize: ['logged'], title: 'Lx Vue管理后台模板', icon: 'icon-home'},
    component: () => import('@/views/home/index.vue')
  },
]
