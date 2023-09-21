export default [
  // 内容页
  {
    path: '/content',
    name: 'content',
    redirect: '/content/list',
    meta: {authorize: ['logged'], title: '内容看板', icon: 'icon-details'},
    component: () => import('@/views/content/index.vue'),
    children: [
      // 内容列表
      {
        path: 'list',
        name: 'content_list',
        meta: {authorize: ['logged'], title: '内容页', icon: 'icon-details'},
        component: () => import('@/views/content/item.vue')
      },
      // 内容详情页
      {
        path: 'item/:id',
        name: 'content_item',
        meta: {authorize: ['logged'], title: '内容详情页', icon: 'icon-details'},
        component: () => import('@/views/content/item.vue')
      }
    ]
  }
]
