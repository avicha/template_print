<template>
    <div class="text-setting">
        <div class="text-setting-title">
            <span class="text-setting-span1">基本元件：</span><span class="text-setting-span2">文本</span>
        </div>
        <div class="text-setting-body">
            <textarea class="content" placeholder="请输入内容" v-model="data.content"></textarea>
            <div class="font-style">
                <i class="icon bold-icon" :class="{active: data.isBold}" @click="data.isBold = !data.isBold" title="加粗"></i>
                <i class="icon italic-icon" :class="{active: data.isItalic}" @click="data.isItalic = !data.isItalic" title="斜体"></i>
                <i class="icon underline-icon" :class="{active: data.isUnderline}" @click="data.isUnderline = !data.isUnderline" title="下划线"></i>
            </div>
            <el-form label-width="80px" label-position="left">
                <el-form-item label="字体">
                    <el-select v-model="data.fontFamily" placeholder="请选择字体" size="small">
                        <el-option label="宋体" value="SimSun"></el-option>
                        <el-option label="微软雅黑" value="Microsoft Yahei"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体大小">
                    <div class="fontSize">
                        <i class="icon minus-icon" title="缩小" @click="minusFontSizeHandler"></i><input type="text" class="font-size-input" v-model="data.fontSize" @input="fontSizeInputHandler" /><i class="icon plus-icon" title="放大" @click="plusFontSizeHandler"></i>    
                    </div>
                </el-form-item>
                <div class="el-form-item">
                    <label class="el-label">文本颜色</label><input type="text" class="color" v-model="data.color"><el-color-picker v-model="data.color"></el-color-picker>
                </div>
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
import {Input, Form, FormItem, Select, Option, InputNumber, ColorPicker} from 'element-ui'
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(ColorPicker)

export default {
    data(){
        return {
            ready: false,
            data: {
                content: '',
                isBold: false,
                isItalic: false,
                isUnderline: false,
                fontFamily: 'Microsoft Yahei',
                fontSize: 14,
                color: '#000',
                left: 0,
                top: 0
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
        minusFontSizeHandler(){
            if(this.data.fontSize > 8){
                this.data.fontSize-- 
            }
        },
        plusFontSizeHandler(){
            this.data.fontSize++
        },
        fontSizeInputHandler(e){
            let value = e.target.value
            if(value && !/^[1-9]\d*$/.test(value)){
                this.data.fontSize = /[1-9]\d*/.test(value)? value.match(/[1-9]\d*/)[0] : ''
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
            let dataClone = JSON.parse(JSON.stringify(data))
            for(let key in dataClone){
                if(this.data[key] !== undefined){
                    this.data[key] = dataClone[key]
                }
            }
            this.ready = false
            Vue.nextTick(()=>{
                this.ready = true
            })
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.text-setting {
    .text-setting-title {
        padding: 0 20px;
        line-height: 44px;
        .text-setting-span1 {
            margin-right: 10px;
        }
        .text-setting-span2 {
            color: #0abfab;
        }
    }
    .text-setting-body {
        padding-top: 16px;
        padding-bottom: 10px;
        width: 190px;
        margin: 0 auto;
        border-top: 1px solid #d6d6d6;
        .content {
            display: block;
            width: 100%;
            height: 120px;
            box-sizing: border-box;
            padding: 10px;
            border: 1px solid #d6d6d6;
            border-radius: 4px;
            color: #333;
            font-family: Microsoft Yahei;
        }
        .font-style {
            width: 100%;
            height: 34px;
            margin: 14px 0;
            box-sizing: border-box;
            border: 1px solid #d6d6d6;
            border-radius: 4px;
            overflow: hidden;
            .icon {
                float: left;
                border-right: 1px solid #d6d6d6;
                &:last-child {
                    border-right: none;
                }
            }
        }
        .fontSize {
            height: 24px;
            width: 108px;
            line-height: 0;
            @include BD1;
            border-radius: 4px;
            .plus-icon {
                border-left: 1px solid #d6d6d6;
            }
            .font-size-input {
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
            .el-label {
                line-height: 1;
                float: left;
            }
            label {
                text-align-last: justify;
                font-size: 14px;
                padding: 6px 24px 6px 0;
            }
            .el-form-item__content {
                line-height: 26px;
                .el-select, .el-input {
                    .el-input__inner {
                        height: 26px;
                    }
                }
            }
            .color {
                width: 88px;
                height: 26px;
                box-sizing: border-box;
                padding: 3px 10px;
                @include BD1;
                border-right: 0;
                border-radius: 4px;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                vertical-align: middle;
            }
            .el-color-picker {
                vertical-align: middle;
                .el-color-picker__trigger {
                    display: block;
                    padding: 0;
                    height: 26px;
                    border-left: 0;
                    border-radius: 4px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    overflow: hidden;
                    .el-color-picker__color {
                        width: 21px;
                        height: 24px;
                        border: none;
                    }
                    .el-color-picker__icon {
                        display: none;
                    }
                }
            }
        }
    }
    
}
</style>