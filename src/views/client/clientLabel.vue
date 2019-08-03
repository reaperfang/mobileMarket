<template>
    <div class="c_container">
        <div class="c_line">
            <span>标签名称：</span>
            <div class="input_wrap">
                <el-input v-model="labelName" placeholder="请输入标签名称"></el-input>
            </div>
            <span class="marL20">标签类型：</span>
            <div class="input_wrap marR100">
                <el-select v-model="labelType">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary">查 询</el-button>
            <el-button>重 置</el-button>
        </div>
        <el-button type="primary">添加标签</el-button>
        <clTable style="margin-top: 50px"></clTable>
    </div>
</template>
<script type="es6">
import clTable from './components/clientLabel/clTable';
export default {
    name:'clientLabel',
    components: { clTable },
    data() {
        return {
            labelName:"",
            labelType:"",
            options: [
                {label: '渠道1',value: 1},
                {label: '渠道2',value: 2}
            ],
        }
    },
    computed: {
        memberLabels() {
            return clientCont.memberLabels
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.c_container{
    padding: 32px 36px;
    background-color: #fff;
    .c_line{
        margin-bottom: 30px;
        span{
            color: #3D434A;
        }
        .input_wrap{
            width: 160px;
            display: inline-block;
        }
    }
}
</style>
