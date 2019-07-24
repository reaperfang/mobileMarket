import Layout from '@/components/layout/Layout'

export default [
    {
        path: '/set',
        component: Layout,
        name: 'set',
        meta: {
        title: '设置',
        icon: 'el-icon-setting'
        },
        children: [
            {
                path: 'shopInfo',
                component: () => import('@/views/set/shopInfo'),
                name: 'shopInfo',
                meta: { title: '店铺信息', noCache: true, tabTitle: '通用设置' }
            },
            {
                path: 'messageSet',
                component: () => import('@/views/set/messageSet'),
                name: 'messageSet',
                meta: { title: '消息设置', noCache: true, tabTitle: '通用设置' }
            },
            {
                path: 'tradeSet',
                component: () => import('@/views/set/tradeSet'),
                name: 'tradeSet',
                meta: { title: '交易设置', noCache: true, tabTitle: '通用设置' }
            },
            {
                path: 'payType',
                component: () => import('@/views/set/payType'),
                name: 'payType',
                meta: { title: '支付方式', noCache: true, tabTitle: '资产设置' }
            },
            {
                path: 'wxSet',
                component: () => import('@/views/set/wxSet'),
                name: 'wxSet',
                meta: { title: '设置微信支付信息', noCache: true, tabTitle: '资产设置' },
                hidden: true
            },
            {
                path: 'withdrawSet',
                component: () => import('@/views/set/withdrawSet'),
                name: 'withdrawSet',
                meta: { title: '提现设置', noCache: true, tabTitle: '资产设置' }
            },
            {
                path: 'subaccountManage',
                component: () => import('@/views/set/subaccountManage'),
                name: 'subaccountManage',
                meta: { title: '子账号管理', noCache: true, tabTitle: '权限管理' }
            },
            {
                path: 'roleManage',
                component: () => import('@/views/set/roleManage'),
                name: 'roleManage',
                meta: { title: '角色管理', noCache: true, tabTitle: '权限管理' }
            },
        ]
    }
]