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
      },
      {
        path: 'clientInfo',
        component: () => import('@/views/client/clientInfo'),
        name: 'clientInfo',
        hidden: true, 
        meta: { title: '全部客户', noCache: true, tabTitle: '客户管理' }
      },
      {
        path: 'clientImport',
        component: () => import('@/views/client/clientImport'),
        name: 'clientImport',
        hidden: true, 
        meta: { title: '全部客户', noCache: true, tabTitle: '客户管理' }
      }
    ]
	}
]