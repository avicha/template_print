<template>
    <div class="container-setting">
        <div class="setting-title">
            <span class="setting-span">组合组件：</span>
        </div>
        <div class="setting-body">
            <el-form label-width="68px" label-position="left">
                <el-form-item label="横轴">
                    <el-input v-model.number="data.left" @input="leftInputHandler" placeholder="" size="small">
                        <template slot="append">mm</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="竖轴">
                    <el-input v-model.number="data.top" @input="topInputHandler" placeholder="" size="small">
                        <template slot="append">mm</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {Input, Form, FormItem} from 'element-ui'
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)

export default {
    data(){
        return {
            ready: false,
            data: {
                left: 0,
                top: 0,
            }
        }
    },
    watch:{
        data:{
            handler(data){
                if(this.ready){
                    this.$emit('changeComponentSetting', data)  
                }
            },
            deep: true
        }
    },
    methods:{
        leftInputHandler(value){
            if(!/^[0-9]*$/.test(value)){
                Vue.nextTick(()=>{
                    this.data.left = value.match(/\d+/) && value.match(/\d+/)[0] || 0    
                })
            } else {
                if(Number(value) > 9999){
                    Vue.nextTick(()=>{
                        this.data.left = 9999  
                    })
                }
            }
        },
        topInputHandler(value){
            if(!/^[0-9]*$/.test(value)){
                Vue.nextTick(()=>{
                    this.data.top = value.match(/\d+/) && value.match(/\d+/)[0] || 0    
                })
            } else {
                if(Number(value) > 9999){
                    Vue.nextTick(()=>{
                        this.data.top = 9999
                    })
                }
            }
        }
    },
    mounted(){
        this.$on('set_data', data => {
            let dataClone = JSON.parse(JSON.stringify(data))
            for(let key in dataClone){
                if(this.data[key] !== undefined){
                    this.data[key] = dataClone[key]
                }
            }
            this.ready = false
            Vue.nextTick(() => {
                this.ready = true
            })
        })
    }
}
</script>

<style lang="scss">
.container-setting {
    .setting-title {
        padding: 0 20px;
        line-height: 44px;
    }
    .setting-body {
        padding: 16px 20px 10px;
        border-top: 1px solid #d6d6d6;
        .content {
            width: 100%;
            height: 120px;
            box-sizing: border-box;
            padding: 10px;
            border: 1px solid #d6d6d6;
            border-radius: 4px;
            color: #333;
            font-family: Microsoft Yahei;
        }
        .el-form-item {
            height: 36px;
            margin-bottom: 14px;
            &:last-child {
                margin-bottom: 0;
            }
            .el-label {
                line-height: 36px;
                margin-right: 12px;
                float: left;
            }
            label {
                text-align-last: justify;
            }
        }
    }
}
</style>