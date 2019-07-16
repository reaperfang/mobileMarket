import Layout from '@/components/layout/Layout'

export default [
  {
		path: '/goods',
    component: Layout,
    name: 'goods',
    meta: {
      title: '商品',
      icon: 'el-icon-setting'
    },
    children: [
    	{
        path: 'helloWorld',
        component: () => import('@/views/demo/helloWorld'),
        name: 'helloWorld',
        meta: { title: 'elementUi', noCache: true },
        children: [
          {
            path: 'helloWorld',
            component: () => import('@/views/demo/helloWorld'),
            name: 'helloWorld',
            meta: { title: 'elementUi', noCache: true }
          },
          {
            path: 'helloWorld2',
            component: () => import('@/views/demo/helloWorld2'),
            name: 'helloWorld2',
            meta: { title: '过滤器使用demo', noCache: true }
          },
        ]
      },
    	{
        path: 'helloWorld2',
        component: () => import('@/views/demo/helloWorld2'),
        name: 'helloWorld2',
        meta: { title: '过滤器使用demo', noCache: true }
      },
    	
    ]
	}
]