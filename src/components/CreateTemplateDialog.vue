<template>
    <el-dialog class="create-template-dialog" :title="'新建' + templateType" v-model="isShown"  @close="reset" :close-on-click-modal="false" size="tiny">
        <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
            <el-form-item label="名称" prop="templateName">
                <el-input v-model.trim="form.templateName" :maxlength="20" ref="templateName" :autofocus="true" :icon="form.templateName? 'empty':''" :on-icon-click="()=>{form.templateName=''}">
                </el-input>
            </el-form-item>
            <el-form-item label="店铺" v-show="type==1" prop="shopId">
                <el-select v-model="form.shopId" placeholder="请选择">
                    <el-option
                        v-for="shop in shopList"
                        :label="shop.shopName"
                        :value="shop.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="常用模板尺寸">
                <el-select v-model="currentTemplateSize" placeholder="请选择" @change="changeTemplateSize">
                    <el-option label="自定义" value=""></el-option>
                    <el-option
                        v-for="templateSize in templateSizeList"
                        :label="templateSize.templateName"
                        :value="templateSize.width + 'x' + templateSize.height">
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="el-form-item size-container">
                <p class="label">
                    尺寸（单位：毫米）
                </p>
                <div class="size">
                    <el-form-item label="高度" prop="height"><el-input ref="height" class="height" @input="heightInputHandler" v-model.number.trim="form.height" @change="customTemplateSize"></el-input></el-form-item><span class="multiple-text">x</span><el-form-item label="宽度" prop="width"><el-input ref="width" class="width" v-model.number.trim="form.width" @input="widthInputHandler" @change="customTemplateSize"></el-input></el-form-item>
                </div>
            </div>
        </el-form>    
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="createTemplate">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Form, FormItem, Input, Select, Option, Row, Col, Button} from 'element-ui'
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)

import extend from 'lodash/extend'
import find from 'lodash/find'

export default {
    name: 'CreateTemplateDialog',
    data() {
        return {
            isShown: false,
            type: null,
            form:{
                templateName: '',
                shopId: '',
                width: 0,
                height: 0,
            },
            currentTemplateSize: '',
            rules:{
                templateName: [
                    {validator:(rule, value, callback)=>{
                        if(value === ''){
                            // this.$refs.templateName.$el.querySelector('input').focus()
                            callback(new Error('请输入' + this.templateType + '名称'))
                        } else {
                            if(value.length >20){
                                // this.$refs.templateName.$el.querySelector('input').focus()
                                callback(new Error('名称长度不能超过20个字符'))
                            } else {
                                let list = this.type == 1? this.qualityList:this.labelList
                                let template = find(list, {templateName: value})
                                if(template){
                                    callback(new Error('该' + this.templateType + '名称已存在，请重新输入'))
                                } else {
                                    callback()
                                }
                            }
                        }
                    }, trigger: 'blur'},
                ],
                shopId: [
                    {validator:(rule, value, callback)=>{
                        if(this.type == 1 && value === ''){
                            callback(new Error('请选择店铺'))
                        } else {
                            callback()
                        }
                    }, trigger: 'blur'},
                ],
                width: [
                    {validator:(rule, value, callback)=>{
                        if(!value){
                            callback(new Error('请填写模板宽度'))
                        } else {
                            if(isNaN(window.parseInt(value))){
                                callback(new Error('宽度必须为数字值'))
                            } else {
                                callback()    
                            }
                        }
                    }, trigger: 'blur'},
                ],
                height: [
                    {validator:(rule, value, callback)=>{
                        if(!value){
                            callback(new Error('请填写模板高度'))
                        } else {
                            if(isNaN(window.parseInt(value))){
                                callback(new Error('高度必须为数字值'))
                            } else {
                                callback()    
                            }
                        }
                    }, trigger: 'blur'},
                ],
            }
        }
    },
    props: ['shopList', 'templateSizeList', 'qualityList', 'labelList'],
    computed: {
        templateType(){
            return this.type == 1 ? '质保单':'标签'
        },
        shopName(){
            if(this.form.shopId){
                let shop = find(this.shopList, {shopId: this.form.shopId})
                if(shop){
                    return shop.shopName
                }
            }
        }
    },
    methods:{
        close(){
            this.isShown = false
        },
        show(){
            this.isShown = true
            window.addEventListener('keydown', this.keydownHandler)
        },
        keydownHandler(e){
            if(e.keyCode == 13){
                this.createTemplate()
            }
        },
        reset(){
            window.removeEventListener('keydown', this.keydownHandler)
            this.$refs.form.resetFields()
        },
        createTemplate(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    let content = JSON.stringify({
                        percentage: 100,
                        width: this.form.width,
                        height: this.form.height,
                        backgroundImage: '',
                        rotateDeg: 0,
                        components: [

                        ],
                    })
                    this.$emit('create_template', this.type, {type: this.type, shopName: this.shopName, content: content, ...this.form})
                }
            })
        },
        changeTemplateSize(value){
            if(value){
                this.form.width = this.currentTemplateSize.split('x')[0] || ''
                this.form.height = this.currentTemplateSize.split('x')[1] || ''
            }
        },
        customTemplateSize(){
            this.currentTemplateSize = ''
        },
        heightInputHandler(value){
            if(value && !/^\d+$/.test(value)){
                Vue.nextTick(()=>{
                    this.form.height = /\d+/.test(value)? value.match(/\d+/)[0] : ''
                })
            } else {
                if(Number(value) > 9999){
                    Vue.nextTick(()=>{
                        this.data.height = 9999
                    })
                }
            }
        },
        widthInputHandler(value){
            if(value && !/^\d+$/.test(value)){
                Vue.nextTick(() => {
                    this.form.width = /\d+/.test(value)? value.match(/\d+/)[0] : ''
                })
            } else {
                if(Number(value) > 9999){
                    Vue.nextTick(() => {
                        this.form.width = 9999
                    })
                }
            }
        },
    },
    mounted(){
        this.$on('set_data', data => {
            data = JSON.parse(JSON.stringify(data))
            extend(this.$data, data)
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.create-template-dialog {
    .el-dialog {
        width: 420px;
        .el-dialog__header {
            text-align: center;
            padding: 0 30px;
            height: 44px;
            line-height: 44px;
            border-bottom: 1px solid $C3;
            .el-dialog__title {
                font-weight: normal;
                @include F(16);
                @include TC1;
            }
            .el-dialog__headerbtn {
                .el-icon-close {
                    @include F(14);
                }
            }
        }
        .el-form {
            padding: 0 20px;
            .el-select {
                width: 100%;
            }
            .size-container {
                .label {
                    vertical-align: middle;
                    color: #48576a;
                    line-height: 1;
                    padding: 11px 12px 11px 0;
                    box-sizing: border-box;
                }
                .size {
                    .el-form-item {
                        display: inline-block;
                        .el-form-item__label {
                            padding: 11px 14px 11px 0;
                        }
                        .el-form-item__content {
                            display: inline-block;
                        }
                    }
                    .multiple-text {
                        margin: 0 14px;
                        vertical-align: middle;
                    }
                    .width, .height {
                        width: 110px;
                        vertical-align: middle;
                    }
                }
            }
        }
        .dialog-footer {
            text-align: center;
            .el-button {
                width: 120px;
                padding: 7px 10px;
                &.cancel {
                    @include BD1;
                    @include TC7;
                    margin-right: 40px;
                }
                &.confirm {
                    margin-left: 0;
                    background-color: $C4;
                    border-color: $C1;
                    @include TC6;
                    box-shadow: 0 0 6px $C3;  
                }
            }
        }
    }
}
</style>
