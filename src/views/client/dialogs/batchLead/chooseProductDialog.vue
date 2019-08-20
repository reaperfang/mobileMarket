<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="选择商品" :hasCancel="hasCancel">
        <div class="c_container">
           <div>
               <div class="input_wrap">
                   <el-cascader
                    :options="categoryOptions"
                    v-model="categoryValue"
                   ></el-cascader>
               </div>
                <div class="input_wrap">
                    <el-input placeholder="输入商品标签"></el-input>
                </div>
                <div class="input_wrap2">
                    <el-input placeholder="输入商品名称/商品编号"></el-input>
                </div>
                <el-button type="primary" class="marL10" @click="handleSearch">搜索</el-button>
                <el-button>重置</el-button>
           </div>
           
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'
export default {
    props: ['data'],
    name: "chooseProductDialog",
    data() {
        return {
            hasCancel: true,
            categoryOptions:[],
            categoryValue:[]
        }
    },
    methods: {
        submit() {
            
        },
        transTreeData(data, pid) {
            var result = [], temp;
            for (var i = 0; i < data.length; i++) {
                if (data[i].parentId == pid) {
                    var obj = {"categoryName": data[i].name,"id": data[i].id, 
                        parentId: data[i].parentId, level: data[i].level, sort: data[i].sort, 
                        image: data[i].image, enable: data[i].enable, label: data[i].name, value: data[i].id};
                    temp = this.transTreeData(data, data[i].id);
                    if (temp.length > 0) {
                        obj.children = temp;
                    }
                    result.push(obj);
                }
            }
            return result;
        },
        getProductClass() {
            this._apis.client.getProductClass({}).then((response) => {
                let arr = this.transTreeData(response, 0);
                this.categoryOptions = [].concat(arr);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        handleSearch() {
            console.log(this.categoryValue);
        }
    },
    computed: {
        visible: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible', val)
            }
        }
    },
    mounted() {
        this.getProductClass();
    },
    props: {
        data: {

        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
    },
    components: {
        DialogBase
    }
}
</script>
<style lang="scss" scoped>
.c_container{
    > div{
        text-align: left;
        margin-bottom: 17px;
        .input_wrap{
            width: 150px;
            display: inline-block;
        }
        .input_wrap2{
            width: 174px;
            display: inline-block;
        }
    }
}
</style>


