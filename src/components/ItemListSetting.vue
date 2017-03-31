<template>
    <div class="item-list-setting">
        <div class="setting-title">
            <span class="setting-span1">基本元件：</span><span class="setting-span2">动态数据域</span>
        </div>
        <div class="setting-body">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="宽">
                    <el-input v-model.number="data.width" @input="widthInputHandler" placeholder="" size="small">
                        <template slot="append">mm</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="高">
                    <el-input v-model.number="data.height" @input="heightInputHandler" placeholder="" size="small">
                        <template slot="append">mm</template>
                    </el-input>
                </el-form-item>
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
                <el-form-item label="数据条数">
                    <div class="number">
                        <i class="icon minus-icon" title="缩小" @click="minusNumberHandler"></i><input type="text" class="number-input" v-model="data.number" @input="numberInputHandler" /><i class="icon plus-icon" title="放大" @click="plusNumberHandler"></i>    
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {Input, Form, FormItem, InputNumber} from 'element-ui'
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(InputNumber)

export default {
    data(){
        return {
            ready: false,
            data: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                number: 1
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
    methods: {
        minusNumberHandler(){
            if(this.data.number > 1){
                this.data.number--    
            }
        },
        plusNumberHandler(){
            this.data.number++
        },
        numberInputHandler(e){
            let value = e.target.value
            if(value && !/^\d+$/.test(value)){
                this.data.number = /\d+/.test(value)? value.match(/\d+/)[0] : ''
            } else {
                if(value){
                    if(Number(value) > 9999){
                        this.data.number = 9999  
                    } else {
                        this.data.number = Number(value)
                    }
                }
            }
        },
        widthInputHandler(value){
            if(value && !/^\d+$/.test(value)){
                Vue.nextTick(()=>{
                    this.data.width = /\d+/.test(value)? value.match(/\d+/)[0] : ''
                })
            } else {
                if(Number(value) > 9999){
                    Vue.nextTick(()=>{
                        this.data.width = 9999
                    })
                }
            }
        },
        heightInputHandler(value){
            if(value && !/^\d+$/.test(value)){
                Vue.nextTick(()=>{
                    this.data.height = /\d+/.test(value)? value.match(/\d+/)[0] : ''
                })
            } else {
                if(Number(value) > 9999){
                    Vue.nextTick(()=>{
                        this.data.height = 9999
                    })
                }
            }
        },
        leftInputHandler(value){
            if(value && !/^\d+$/.test(value)){
                Vue.nextTick(()=>{
                    this.data.left = /\d+/.test(value)? value.match(/\d+/)[0] : ''
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
            if(value && !/^\d+$/.test(value)){
                Vue.nextTick(()=>{
                    this.data.top = /\d+/.test(value)? value.match(/\d+/)[0] : ''
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
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.item-list-setting {
    .setting-title {
        padding: 0 20px;
        line-height: 44px;
        .setting-span1 {
            margin-right: 10px;
        }
        .setting-span2 {
            color: #0abfab;
        }
    }
    .setting-body {
        padding-top: 16px;
        padding-bottom: 10px;
        width: 190px;
        margin: 0 auto;
        border-top: 1px solid #d6d6d6;
        .number {
            height: 24px;
            width: 108px;
            line-height: 0;
            @include BD1;
            border-radius: 4px;
            .plus-icon {
                border-left: 1px solid #d6d6d6;
            }
            .number-input {
                text-align: center;
                width: 62px;
                height: 24px;
                line-height: 24px;
                @include F(12);
                @include TC1;
            }
            .minus-icon {
                border-right: 1px solid #d6d6d6;
            }
        }
        .el-form-item {
            height: 26px;
            margin-bottom: 14px;
            &:last-child {
                margin-bottom: 0;
            }
            .el-form-item__content {
                line-height: 26px;
                .el-input {
                    width: 110px;
                    .el-input__inner {
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