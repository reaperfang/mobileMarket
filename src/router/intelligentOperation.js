import Layout from '@/components/layout/Layout'

export default [
    {
        path: '/intelligentOperation',
        component: Layout,
        name: 'intelligentOperation',
        meta: {
        title: '智能运营',
        icon: 'el-icon-setting'
        },
        children: [
            {
                path: 'perTicketSales',
                component: () => import('@/views/intelligentOperation/perTicketSales'),
                name: 'perTicketSales',
                meta: { title: '客单价', noCache: true, tabTitle: '客单价' }
            },
            {
                path: 'memberInfo',
                component: () => import('@/views/intelligentOperation/memberInfo'),
                name: 'memberInfo',
                meta: { title: '会员信息', noCache: true, tabTitle: '会员分析' }
            },
            {
                path: 'channel',
                component: () => import('@/views/intelligentOperation/memberInfo'),
                name: 'channel',
                meta: { title: '渠道转化', noCache: true, tabTitle: '会员分析' }
            },
            {
                path: 'integral',
                component: () => import('@/views/intelligentOperation/memberInfo'),
                name: 'integral',
                meta: { title: '积分消耗', noCache: true, tabTitle: '会员分析' }
            },
            {
                path: 'evaluate',
                component: () => import('@/views/intelligentOperation/memberInfo'),
                name: 'evaluate',
                meta: { title: '评价', noCache: true, tabTitle: '口碑分析' }
            },
            {
                path: 'rightsProtection',
                component: () => import('@/views/intelligentOperation/memberInfo'),
                name: 'rightsProtection',
                meta: { title: '维权', noCache: true, tabTitle: '口碑分析' }
            },
        ]
    }
]