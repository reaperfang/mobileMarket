/* 财务模块常量 */
export default {
    //收支明细类型
    revenueExpenditureTerms:[
        { value: 1, label: '交易流水号' },
        { value: 2, label: '关联单据编号' },
        { value: 3, label: '微信流水号' },
    ],
    //收支明细业务类型
    rebusinessTypes:[
        { value: 1, label: '全部' },
        { value: 2, label: '订单收款' },
        { value: 3, label: '退款付款' },
        { value: 4, label: '退还奖励' },
        { value: 5, label: '快递结算' },
        { value: 6, label: '短信结算' }
    ],
    //支付方式
    payTypes:[
        { value: 1, label: '全部' },
        { value: 2, label: '微信支付' },
        { value: 3, label: '线下支付' }
    ],
    //提现方式
    presentations:[
        { value: 1, label: '提现编号' },
        { value: 2, label: '交易流水号' },
    ],
    //提现状态
    presentationStatus:[
        { value: 1, label: '全部' },
        { value: 2, label: '待审核' },
        { value: 3, label: '成功' },
        { value: 4, label: '失败' },
        { value: 5, label: '处理中' }
    ],
    //交易类型
    transactionTypes:[
        { value: 1, label: '全部' },
        { value: 2, label: '订单收款' },
        { value: 3, label: '售后退款' },
        { value: 4, label: '申请提现' },
        { value: 5, label: '红包到账' },
        { value: 6, label: '提示失败' }
    ],
    //积分明细业务类型
    idbusinessTypes:[
        { value: 1, label: '全部' },
        { value: 2, label: '登陆' },
        { value: 3, label: '购买' },
        { value: 4, label: '复购' },
        { value: 5, label: '红包' },
        { value: 6, label: '互动' },
        { value: 7, label: '多人拼团' },
        { value: 8, label: '限时秒杀' },
        { value: 9, label: '评价' },
        { value: 10, label: '填写信息' },
        { value: 11, label: '签到' },
        { value: 12, label: '节日有礼' },
        { value: 13, label: '积分兑换' },
        { value: 14, label: '手动调整' },
        { value: 15, label: '清空' },
    ],
    //奖励方式
    rewards:[
        { value: 1, label: '全部' },
        { value: 2, label: '积分' },
        { value: 3, label: '优惠券' },
        { value: 4, label: '红包' },
        { value: 5, label: '优惠码' },
        { value: 6, label: '赠品' },
    ],
    //概况分析
    surveyStatus:[
        { value: 1, label: '开店以来' },
        { value: 2, label: '近一周' },
        { value: 3, label: '近一个月' },
        { value: 4, label: '近三个月' }
    ],
    //电子面单类型
    fsTerms:[
        { value: 1, label: '订单编号' },
        { value: 2, label: '快递单号' },
    ],
    //电子面单业务类型
    fsTypes:[
        { value: 1, label: '全部' },
        { value: 2, label: '订单发货' },
        { value: 3, label: '售后发货' },
    ],
    //短信群群发
    smsStatus:[
        { value: 1, label: '全部' },
        { value: 2, label: '成功' },
        { value: 3, label: '失败' },
    ],

}