import Layout from '@/components/layout/Layout'

export default [
  {
	path: '/datum',
    component: Layout,
    name: 'datum',
    meta: {
      title: '数据',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'passengerFlow',
        component: () => import('@/views/datum/passengerFlow'),
        name: 'passengerFlow',
        meta: { title: '客流分析', noCache: true, tabTitle: '访问' }
      }
    ]
	}
]