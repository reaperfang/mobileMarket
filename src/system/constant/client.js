/* 客户模块常量 */
export default {
    //客户身份
    clientStatusOps: ['非会员客户','会员'],
    //客户渠道
    clientChannelOps: [
        {
            id:'0001',
            cid: "2",
            channerlName:"渠道一"
        },
        {
            id:'0002',
            cid: "2",
            channerlName:"渠道二"
        },
        {
            id:'0003',
            cid: "3",
            channerlName:"渠道三"
        }
    ],
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