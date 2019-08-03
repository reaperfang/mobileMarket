<template>
    <div class="c_container">
        <div>
            <span class="marR10">状态</span>
            <el-select v-model="status" placeholder="全部">
                <el-option label="禁用" value="0"></el-option>
                <el-option label="启用" value="1"></el-option>
            </el-select>
            <el-button type="primary" class="marL20">查 询</el-button>
        </div>
        <cvTable style="margin-top: 36px"></cvTable>
    </div>
</template>
<script>
import cvTable from './components/clientLevel/cvTable';
export default {
    name: 'clientLevel',
    components: { cvTable },
    data() {
        return {
            status:""
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.c_container{
    padding: 20px;
    background-color: #fff;
}
</style>

