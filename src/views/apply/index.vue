/*应用*/
<template>
    <div class="main">       
        <iframe :src="src"></iframe>
    </div>
</template>

<script>
import { getToken } from '@/system/auth'
export default {
    data(){
        return{
            src:'',
            token:'',
            cid:'',
            tenantId:localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).tenantInfoId
        }
    },
    created(){
        this.init()
    },
    mounted () {
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
        window.addEventListener('marketing_router_path', event => {
            console.log('event=', event);
        })
        // this.iframeWin = this.$refs.iframe.contentWindow
    },
    methods:{
        init(){
            this.token = getToken('authToken')
            let shopInfo = JSON.parse(localStorage.getItem('shopInfos'))
            this.cid = shopInfo && shopInfo.id || ''
            // this.src = `http://test-omo.aiyouyi.cn/vue/marketing/application/appIndex?access=1&token=${this.token}&businessId=1&loginUserId=1&tenantId=${this.tenantId}&cid=${this.cid}`
            this.src = `${process.env.DATA_API}/vue/marketing/application/appIndex?access=1&token=${this.token}&businessId=1&loginUserId=1&tenantId=${this.tenantId}&cid=${this.cid}`
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
    width: 100%;
    height: 100%;
    iframe{
        width:100%;
        height: 100%;
        border:none;
    }
}
</style>