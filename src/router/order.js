import Layout from '@/components/layout/Layout'

export default [
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: {
      title: '订单',
      icon: 'icon_order'
    },
    children: [
      {
        path: 'query',
        component: () => import('@/views/order/query'),
        name: 'query',
        meta: { title: '订单查询', noCache: true, tabTitle: '订单管理' },
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/order/orderDetail'),
        name: 'orderDetail',
        hidden: true,
        meta: { title: '订单详情', noCache: true, tabTitle: '订单管理' },
      },
      {
        path: 'deliverGoods',
        component: () => import('@/views/order/deliverGoods'),
        name: 'deliverGoods',
        hidden: true,
        meta: { title: '发货', noCache: true, tabTitle: '订单管理' },
      },
      {
        path: 'richLogistics',
        component: () => import('@/views/order/richLogistics'),
        name: 'richLogistics',
        hidden: true,
        meta: { title: '自动发货', noCache: true, tabTitle: '订单管理' },
      },
      {
        path: 'deliveryManagement',
        component: () => import('@/views/order/deliveryManagement'),
        name: 'deliveryManagement',
        meta: { title: '发货管理', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'afterSalesManagement',
        component: () => import('@/views/order/afterSalesManagement'),
        name: 'afterSalesManagement',
        meta: { title: '售后管理', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'afterSalesDetails',
        component: () => import('@/views/order/afterSalesDetails'),
        name: 'afterSalesDetails',
        meta: { title: '售后详情', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'printDistributionSheet',
        component: () => import('@/views/order/printDistributionSheet'),
        name: 'printDistributionSheet',
        hidden: true,
        meta: { title: '打印配送单', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'reviews',
        component: () => import('@/views/order/reviews'),
        name: 'reviews',
        meta: { title: '评价管理', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'reviewsDetail',
        component: () => import('@/views/order/reviewsDetail'),
        name: 'reviewsDetail',
        hidden: true,
        meta: { title: '评价详情', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'sensitiveWords',
        component: () => import('@/views/order/sensitiveWords'),
        name: 'sensitiveWords',
        hidden: true,
        meta: { title: '敏感词', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'batchImportAndDelivery',
        component: () => import('@/views/order/batchImportAndDelivery'),
        name: 'batchImportAndDelivery',
        hidden: true,
        meta: { title: '批量导入发货', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'printingElectronicForm',
        component: () => import('@/views/order/printingElectronicForm'),
        name: 'printingElectronicForm',
        hidden: true,
        meta: { title: '打印电子面单', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'bulkDelivery',
        component: () => import('@/views/order/bulkDelivery'),
        name: 'bulkDelivery',
        hidden: true,
        meta: { title: '批量发货', noCache: true, tabTitle: '订单处理' },
      },
      {
        path: 'quickDelivery',
        component: () => import('@/views/order/quickDelivery'),
        name: 'quickDelivery',
        meta: { title: '快递发货', noCache: true, tabTitle: '物流配送' },
      },
      {
        path: 'newTemplate',
        component: () => import('@/views/order/newTemplate'),
        name: 'newTemplate',
        hidden: true,
        meta: { title: '新建模板', noCache: true, tabTitle: '物流配送' },
      },
      {
        path: 'electronicFaceSheet',
        component: () => import('@/views/order/electronicFaceSheet'),
        name: 'electronicFaceSheet',
        meta: { title: '电子面单', noCache: true, tabTitle: '物流配送' },
      },
      {
        path: 'newElectronicFaceSheet',
        component: () => import('@/views/order/newElectronicFaceSheet'),
        name: 'newElectronicFaceSheet',
        hidden: true,
        meta: { title: '新建电子面单', noCache: true, tabTitle: '物流配送' },
      },
    ]
  }
]