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
        path: 'goodsList',
        component: () => import('@/views/goods/goodsList'),
        name: 'goodsList',
        meta: { title: '商品列表', noCache: true, tabTitle: '商品管理' },
      },
      {
        path: 'addGoods',
        component: () => import('@/views/goods/addGoods'),
        name: 'addGoods',
        meta: { title: '新建商品', noCache: true, tabTitle: '商品管理' },
      },
      {
        path: 'classify',
        component: () => import('@/views/goods/classify'),
        name: 'classify',
        meta: { title: '商品分类', noCache: true, tabTitle: '商品管理' },
      },
      {
        path: 'tag',
        component: () => import('@/views/goods/tag'),
        name: 'tag',
        meta: { title: '商品标签', noCache: true, tabTitle: '商品管理' },
      },
    	{
        path: 'helloWorld2',
        component: () => import('@/views/demo/helloWorld2'),
        name: 'helloWorld2',
        meta: { title: '过滤器使用demo', noCache: true, tabTitle: '商品管理' }
      },
    	{
        path: 'helloWorld3',
        component: () => import('@/views/demo/helloWorld3'),
        name: 'helloWorld3',
        meta: { title: '过滤器使用demo', noCache: true, tabTitle: '分类管理' }
      },
      {
        path: 'helloWorld4',
        component: () => import('@/views/demo/helloWorld4'),
        name: 'helloWorld4',
        meta: { title: '过滤器使用demo', noCache: true, tabTitle: '分类管理' }
      },
      {
        path: 'helloWorld5',
        component: () => import('@/views/demo/helloWorld5'),
        name: 'helloWorld5',
        meta: { title: '过滤器使用demo', noCache: true, tabTitle: '标签管理' }
      },
      {
        path: 'helloWorld6',
        component: () => import('@/views/demo/helloWorld6'),
        name: 'helloWorld6',
        meta: { title: '过滤器使用demo', noCache: true, tabTitle: '标签管理' }
      },
      {
        path: 'helloWorld7',
        component: () => import('@/views/demo/helloWorld7'),
        name: 'helloWorld7',
        meta: { title: '过滤器使用demo', noCache: true, tabTitle: '商品工具' }
      },
    ]
	}
]