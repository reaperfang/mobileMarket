/* 常量 */
export default {
  order: {
    // 订单管理
    // 订单流程状态
    orderStatus: {
      "0": "待付款",
      "1": "待成团",
      "2": "关闭",
      "3": "待发货",
      "4": "部分发货",
      "5": "待收货",
      "6": "完成",
    },
    // 订单类型
    orderType: {
      "1": "普通订单",
      "2": "拼团订单",
      "3": "优惠套装订单",
      "4": "赠品订单"
    },
    // 发货类型
    sendType: {
      "1": "正常发货",
      "2": "自动发货",
      "3": "优先发货"
    },
    // 订单关闭原因
    closeReaosn: {
      "0": "超时取消",
      "1": "客户取消",
      "2": "商户关闭",
      "3": "拼团失败",
      "4": "商户关闭拼团",
      "5": "客户拒收"
    },
    // 付款方式
    payWay: {
      "1": "微信支付",
      "2": "货到付款",
      "3": "找人代付",
      "4": "线下支付",
      "5": "线上支付",
      "6": "支付宝支付"
    },
    // 渠道类型
    channelInfoId: {
      "1": "小程序",
      "2": "公众号"
    },
    // 配送方式
    deliveryWay: {
      "1": "普通快递",
      "2": "商家自送"
    },
    // 订单发货
    // 订单发货列表
    // 状态
    status: {
      "3": "待发货",
      "4": "部分发货",
      "5": "待收货",
      "6": "完成"
    },
    // 是否自动发货
    isAutosend: {
      "0": "否",
      "1": "是"
    },
    // 售后管理
    // 售后单列表
    orderAfterSaleStatus: {
      "0": "提交申请",
      "1": "待退货",
      "2": "待处理",// 客户发货
      "3": "待收货", // 商户发货
      "4": "已完成", // 客户收货/退款成功
      "5": "已关闭" // 客户取消/审核拒绝
    },
    // 售后单类型
    type: {
      "1": "退货退款",
      "2": "换货",
      "3": "仅退款"
    },
    // 是否需要补填物流
    isFillUp: {
      "0": "否",
      "1": "是"
    }
  }
};
