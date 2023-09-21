export default [
  // 消息中心
  {
    path: '/message',
    name: 'message',
    hidden: true,
    meta: {authorize: ['logged'], title: '消息中心'},
    component: () => import('@/views/home/index.vue')
  }
]
