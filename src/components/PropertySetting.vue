<template>
    <div class="property-setting">
        <div class="property-setting-title">
            <span class="property-setting-span1">动态数据项：</span><span class="property-setting-span2">{{ data.propertyName }}</span>
        </div>
        <div class="property-setting-body" v-if="data.propertyType != 4">
            <el-form label-width="38px" label-position="left" class="property-setting-form1">
                <div class="el-form-item" v-show="data.propertyType == 1 || data.propertyType == 3">
                    <label class="el-label">保留小数点位数</label><el-select class="to-fixed" v-model.number="data.toFixed" placeholder="请选择" size="small">
                        <el-option label="0位" value="0"></el-option>
                        <el-option label="1位" value="1"></el-option>
                        <el-option label="2位" value="2"></el-option>
                        <el-option label="3位" value="3" v-show="data.propertyType == 3"></el-option>
                    </el-select>
                </div>
                <div class="el-form-item" v-show="data.propertyType == 2">
                    <label class="el-label">格式</label><el-select class="date-format" v-model="data.dateFormat" placeholder="请选择" size="small">
                        <el-option label="年-月-日 时:分:秒" value="YYYY-MM-DD HH:mm:ss"></el-option>
                        <el-option label="年-月-日 时:分" value="YYYY-MM-DD HH:mm"></el-option>
                        <el-option label="年-月-日" value="YYYY-MM-DD"></el-option>
                        <el-option label="时:分:秒" value="HH:mm:ss"></el-option>
                        <el-option label="时:分" value="HH:mm"></el-option>
                    </el-select>
                </div>
                <el-form-item label="样本">
                    <PropertyValueInput :currentStyleType="styleType" styleType="value" :value="data.sample" @changeStyleType="toggleStyle($event)" @change="(value)=>{this.data.sample = value}"></PropertyValueInput>
                </el-form-item>
                <el-form-item label="前缀">
                    <PropertyValueInput :currentStyleType="styleType" styleType="prefix" :value="data.suffix" @changeStyleType="toggleStyle($event)" @change="(value)=>{this.data.prefix = value}"></PropertyValueInput>
                </el-form-item>
                <el-form-item label="后缀">
                    <PropertyValueInput :currentStyleType="styleType" styleType="suffix" :value="data.suffix" @changeStyleType="toggleStyle($event)" @change="(value)=>{this.data.suffix = value}"></PropertyValueInput>
                </el-form-item>
            </el-form>
        </div>
        <div class="property-setting-body" v-if="data.propertyType != 4">
            <p class="property-setting-text">{{ propertySettingText }}</p>
            <div class="font-style">
                <i class="icon bold-icon" :class="{active: style.isBold}" @click="style.isBold = !style.isBold" title="加粗"></i>
                <i class="icon italic-icon" :class="{active: style.isItalic}" @click="style.isItalic = !style.isItalic" title="斜体"></i>
                <i class="icon underline-icon" :class="{active: style.isUnderline}" @click="style.isUnderline = !style.isUnderline" title="下划线"></i>
            </div>
            <el-form label-width="80px" label-position="left">
                <el-form-item label="字体">
                    <el-select v-model="style.fontFamily" placeholder="请选择字体" size="small">
                        <el-option label="宋体" value="SimSun"></el-option>
                        <el-option label="微软雅黑" value="Microsoft Yahei"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体大小">
                    <div class="fontSize">
                        <i class="icon minus-icon" title="减少" @click="minusFontSizeHandler"></i><input type="text" class="font-size-input" v-model="style.fontSize" @input="fontSizeInputHandler" /><i class="icon plus-icon" title="增加" @click="plusFontSizeHandler"></i>    
                    </div>
                </el-form-item>
                <div class="el-form-item">
                    <label class="el-label">文本颜色</label><input type="text" class="color" v-model="style.color"><el-color-picker v-model="style.color"></el-color-picker>
                </div>
            </el-form>
        </div>
        <div class="property-setting-body" v-if="data.propertyType != 4">
            <el-form class="property-setting-form4" label-width="80px" label-position="left">
                <el-form-item label="横轴">
                    <LengthInput :length="data.left" @change="(value)=>{this.data.left = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="竖轴">
                    <LengthInput :length="data.top" @change="(value)=>{this.data.top = value}"></LengthInput>
                </el-form-item>
                <div class="text-align">
                    <i class="icon text-align-left-icon" :class="{active: data.textAlign == 'left'}" @click="data.textAlign = 'left'"></i>
                    <i class="icon text-align-center-icon" :class="{active: data.textAlign == 'center'}" @click="data.textAlign = 'center'"></i>
                    <i class="icon text-align-right-icon" :class="{active: data.textAlign == 'right'}" @click="data.textAlign = 'right'"></i>
                </div>
                <div class="vertical-align">
                    <i class="icon vertical-align-top-icon" :class="{active: data.verticalAlign == 'top'}" @click="data.verticalAlign = 'top'"></i>
                    <i class="icon vertical-align-middle-icon" :class="{active: data.verticalAlign == 'middle'}" @click="data.verticalAlign = 'middle'"></i>
                    <i class="icon vertical-align-bottom-icon" :class="{active: data.verticalAlign == 'bottom'}" @click="data.verticalAlign = 'bottom'"></i>
                </div>
            </el-form>
        </div>
        <div class="property-setting-body" v-if="data.propertyType == 4">
            <el-form class="property-setting-form4" ref="form" label-width="80px" :rules="rules" :model="data" label-position="left" @submit.native.prevent>
                <el-form-item label="样本" prop="sample">
                    <div class="el-form-item__content">
                        <div class="sample-input el-input el-input--small">
                            <input type="text" v-model="data.sample" @input="sampleInputHandler" placeholder="" maxlength="8" autocomplete="off" class="el-input__inner" />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="宽">
                    <LengthInput :length="data.width" @change="(value)=>{this.data.width = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="高">
                    <LengthInput :length="data.height" @change="(value)=>{this.data.height = value}"></LengthInput>
                </el-form-item>
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
import {Form, FormItem, Select, Option, InputNumber, ColorPicker} from 'element-ui'
import LengthInput from './LengthInput'
import PropertyValueInput from './PropertyValueInput'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(ColorPicker)

import extend from 'lodash/extend'

export default {
    components: {
        LengthInput,
        PropertyValueInput
    },
    data(){
        return {
            styleType: 'value',
            ready: false,
            data: {
                propertyCode: '',
                propertyName: '',
                propertyType: 0,
                toFixed: 0,
                dateFormat: 'YYYY-MM-DD H:m:s',
                prefix: '',
                prefixStyle: {
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 14,
                    color: '#333',
                },
                sample: '',
                valueStyle: {
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 14,
                    color: '#333',
                },
                suffix: '',
                suffixStyle: {
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 14,
                    color: '#333',
                },
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                textAlign: 'left',
                verticalAlign: 'middle',
            },
            rules:{
                sample: [
                    {min: 8, max: 8, message: '请输入8位数字', trigger: 'blur'},
                ],
            }
        }
    },
    computed:{
        propertySettingText(){
            switch(this.styleType){
                case 'prefix':
                    return '前缀属性'
                case 'value':
                    return '样本属性'
                case 'suffix':
                    return '后缀属性'
                default:
                    return '动态数据项属性'
            }
        },
        style(){
            return this.data[this.styleType + 'Style']
        }
    },
    methods: {
        toggleStyle(type){
            this.styleType = type
        },
        minusFontSizeHandler(){
            if(this.style.fontSize > 12){
                this.style.fontSize--    
            }
        },
        plusFontSizeHandler(){
            this.style.fontSize++
        },
        fontSizeInputHandler(e){
            let value = e.target.value
            if(value && !/^[1-9]\d*$/.test(value)){
                this.style.fontSize = /[1-9]\d*/.test(value)? value.match(/[1-9]\d*/)[0] : ''
            }
        },
        sampleInputHandler(e){
            let value = e.target.value
            if(value && !/^\d+$/.test(value)){
                this.data.sample = /\d+/.test(value)? value.match(/\d+/)[0] : ''
            }
        },
    },
    watch:{
        data:{
            handler(data){
                if(this.ready){
                    this.$emit('changeComponentSetting', data)
                }
            },
            deep: true
        },
    },
    mounted(){
        this.$on('set_data', data => {
            this.ready = false
            let dataClone = JSON.parse(JSON.stringify(data))
            if(data.propertyCode != this.data.propertyCode){
                this.styleType = 'value'
            }
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
.property-setting {
    .property-setting-title {
        padding: 0 20px;
        line-height: 44px;
        .property-setting-span1 {
            margin-right: 10px;
        }
        .property-setting-span2 {
            color: #0abfab;
        }
    }
    .property-setting-body {
        padding-top: 16px;
        padding-bottom: 10px;
        width: 190px;
        margin: 0 auto;
        border-top: 1px solid #d6d6d6;
        .property-setting-text {
            margin-bottom: 10px;
        }
        .property-value-input {
            .el-input__inner {
                width: 130px;
            }
            .el-input-group__append {
                padding: 0;
            }
            .icon {
                opacity: .3;
                &.active {
                    opacity: 1;
                }
            }
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
        .text-align, .vertical-align {
            width: 100%;
            height: 34px;
            margin-bottom: 14px;
            box-sizing: border-box;
            border: 1px solid #d6d6d6;
            border-radius: 4px;
            overflow: hidden;
            .icon {
                float: left;
                opacity: .3;
                border-right: 1px solid #d6d6d6;
                &:last-child {
                    border-right: none;
                }
                &.active {
                    opacity: 1;
                }
            }
        }
        .to-fixed {
            width: 80px;
        }
        .date-format {
            width: 150px;
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
        .property-setting-form1 {
            .el-form-item {
                height: 34px;
                margin-bottom: 14px;
                &:last-child {
                    margin-bottom: 0;
                }
                label {
                    @include text-align-justify;
                    font-size: 14px;
                    padding: 0;
                    padding-right: 10px;
                    line-height: 34px;
                }
                .el-form-item__content {
                    line-height: 34px;
                    .el-select, .el-input {
                        .el-input__inner {
                            height: 34px;
                        }
                    }
                }
            }
        }
        .property-setting-form4 {
            .el-form-item {
                height: 34px;
                margin-bottom: 18px;
                .el-input {
                    .el-input__inner {
                        width: 66px;
                    }
                }
                .sample-input {
                    .el-input__inner {
                        width: 110px;
                    }
                }
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
                @include text-align-justify;
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