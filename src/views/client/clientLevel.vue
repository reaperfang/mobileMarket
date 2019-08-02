<template>
    <div class="c_container">
        <div>
            <span>状态</span>
            <el-select v-model="status" placeholder="全部">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-button type="primary" class="marL20">查 询</el-button>
        </div>
        <cvTable style="margin-top: 36px"></cvTable>
    </div>
</template>
<script>
import cvTable from './components/cvTable';
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

