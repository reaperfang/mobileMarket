/*应用*/
<template>
    <div class="main">        
        <iframe :src="src"></iframe>
    </div>
</template>

<script>
export default {
    data(){
        return{
            src:`${process.env.UPLOAD_SERVER}/vue/marketing/application/appIndex?access=1&token=${token}&businessId=1&loginUserId=1&tenantId=1&cid=${cid}`,
            token:'',
            cid:''
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.token = localStorage.getItem('authToken')
            let shopInfo = JSON.parse(localStorage.getItem('shopInfos'))
            this.cid = shopInfo && shopInfo.id || ''
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