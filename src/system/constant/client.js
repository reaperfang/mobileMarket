/* 客户模块常量 */
export default {
    //客户身份
    clientStatusOps: ['非会员客户','会员'],
    //客户标签
    clientSignOps: ['年轻用户','主力用户','常客','重点维护','标签'],
    //客户渠道
    clientChannelOps: ['小程序','领取会员卡','微信H5'],
    //客户状态
    clientStateOps: ['正常','黑名单'],
    //clientInfo 标签信息
    memberLabels: [
        {
            id:'001',
            tag_name: '年轻用户',
            tag_type: 0
        },
        {
            id:'002',
            tag_name: '女性用户',
            tag_type: 1
        }
    ]
}