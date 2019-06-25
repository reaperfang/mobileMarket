import Layout from '@/components/layout/Layout'

export default [
  {
		path: '/demo',
    component: Layout,
    redirect: {
      name: 'helloWorld'
    },
    name: 'demoPage',
    meta: {
      roles: ['shop'],
      title: 'demo展示',
      icon: 'shop'
    },
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
    	{
        path: 'helloWorl3',
        component: () => import('@/views/demo/helloWorld3'),
        name: 'helloWorld3',
        meta: { title: '腾讯地图demo', noCache: true }
      },
    	{
        path: 'helloWorld4',
        component: () => import('@/views/demo/helloWorld4'),
        name: 'helloWorld4',
        meta: { title: '页面组件demo', noCache: true }
      },
    	{
        path: 'helloWorld5',
        component: () => import('@/views/demo/helloWorld5'),
        name: 'helloWorld5',
        meta: { title: '图表demo', noCache: true }
      },
    	{
        path: 'helloWorld6',
        component: () => import('@/views/demo/helloWorld6'),
        name: 'helloWorld6',
        meta: { title: '富文本和弹窗demo', noCache: true }
      },
    	{
        path: 'helloWorld7',
        component: () => import('@/views/demo/helloWorld7'),
        name: 'helloWorld7',
        meta: { title: '数据请求demo', noCache: true }
      },
    ]
	}
]