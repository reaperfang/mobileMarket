import Layout from '@/components/layout/Layout'

export default [
  {
		path: '/client',
    component: Layout,
    name: 'client',
    meta: {
      title: '客户',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'allClient',
        component: () => import('@/views/client/allClient'),
        name: 'allClient',
        meta: { title: '全部客户', noCache: true, tabTitle: '客户管理' }
      }
    ]
	}
]