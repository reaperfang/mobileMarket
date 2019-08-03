import Layout from '@/components/layout/Layout'

export default [
  {
	path: '/apply',
    component: Layout,
    name: 'apply',
    meta: {
      title: '应用',
      icon: 'icon_apply'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/apply/index'),
        name: 'index',
        meta: { title: '应用', noCache: true }
      },
    ]
  }
]