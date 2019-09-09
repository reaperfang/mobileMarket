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
            src:'http://test-omo.aiyouyi.cn/vue/marketing/application/appIndex?access=1&token=123&businessId=1&loginUserId=1&tenantId=1&cid=2'
        }
    },
    methods:{

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