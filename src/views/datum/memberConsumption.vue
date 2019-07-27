<template>
    <div class="p_container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部" name="first">
                <div class="pane_container">
                    <div class="i_line">
                        <div class="input_wrap">
                            <el-select placeholder="排序">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </div>
                        <div class="input_wrap">
                            <el-input placeholder="会员名/手机号">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <mcTable style="margin-top: 50px"></mcTable>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公众号" name="second">公众号</el-tab-pane>
            <el-tab-pane label="小程序" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import mcTable from './components/mcTable'
export default {
    components: { mcTable },
    data() {
        return {
            activeName: "first", 
            range: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.p_container{
    padding: 20px;
    background-color: #fff;
    .pane_container{
        color: #3D434A;
        .i_line{
            padding-left: 35px;
            .input_wrap{
                width: 320px;
                display: inline-block;
            }
        }
    }
}
</style>

