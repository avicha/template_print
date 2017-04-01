<template>
    <div class="container-setting">
        <div class="setting-title">
            <span class="setting-span">组合组件：</span>
        </div>
        <div class="setting-body">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="横轴">
                    <LengthInput :length="data.left" @change="(value)=>{this.data.left = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="竖轴">
                    <LengthInput :length="data.top" @change="(value)=>{this.data.top = value}"></LengthInput>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {Form, FormItem} from 'element-ui'
import LengthInput from './LengthInput'

Vue.use(Form)
Vue.use(FormItem)

export default {
    components: {
        LengthInput
    },
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
                    this.$emit('moveComponentTo', data)  
                }
            },
            deep: true
        }
    },
    mounted(){
        this.$on('set_data', data => {
            this.ready = false
            let dataClone = JSON.parse(JSON.stringify(data))
            for(let key in dataClone){
                if(this.data[key] !== undefined){
                    this.data[key] = dataClone[key]
                }
            }
            Vue.nextTick(() => {
                this.ready = true
            })
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.container-setting {
    .setting-title {
        padding: 0 20px;
        line-height: 44px;
    }
    .setting-body {
        padding-top: 16px;
        padding-bottom: 10px;
        width: 190px;
        margin: 0 auto;
        border-top: 1px solid #d6d6d6;
        .el-form-item {
            height: 26px;
            margin-bottom: 14px;
            &:last-child {
                margin-bottom: 0;
            }
            .el-form-item__content {
                line-height: 26px;
                .el-input {
                    .el-input__inner {
                        width: 66px;
                        height: 26px;
                    }
                }
            }
            label {
                @include text-align-justify;
                font-size: 14px;
                padding: 6px 24px 6px 0;
            }
        }
    }
}
</style>