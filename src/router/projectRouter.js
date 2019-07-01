import Layout from '@/bizComps/layout/Layout'

export default [
  	{
		path: '/project',
    component: Layout,
    redirect: {
      name: 'page1'
    },
    name: 'projectPage',
    meta: {
      roles: ['shop'],
      title: '项目页面',
      icon: 'shop'
    },
    children: [
    	{
        path: 'page1',
        component: () => import('@/views/project/page1'),
        name: 'page1',
        meta: { title: '项目页面1', noCache: true }
      },
    	{
        path: 'page2',
        component: () => import('@/views/project/page2'),
        name: 'page2',
        meta: { title: '项目页面2', noCache: true }
      }
    ]
	}
]

