<template>
    <el-dialog class="create-template-dialog" :title="title" v-model="isShown" :close-on-click-modal="false" size="tiny">
        <el-form :model="form" @submit.native.prevent>
            <el-form-item label="名称">
                <el-input v-model="form.templateName" ref="templateName" :autofocus="true" :icon="form.templateName? 'empty':''" :on-icon-click="()=>{form.templateName=''}">
                </el-input>
            </el-form-item>
            <el-form-item label="店铺" v-show="type==1">
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
                    <span class="height-text">高度</span><el-input ref="height" class="height" v-model="form.height" @change="customTemplateSize"></el-input><span class="multiple-text">x</span><span class="width-text">宽度</span><el-input ref="width" class="width" v-model="form.width" @change="customTemplateSize"></el-input>
                </div>
            </el-form-item>
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
                type: null,
                templateName: '',
                shopId: '',
                width: null,
                height: null,
            },
            currentTemplateSize: '',
        }
    },
    props: ['shopList', 'templateSizeList'],
    computed: {
        title(){
            return this.type == 1 ? '新建质保单':'新建标签'
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
        },
        createTemplate(){
            let templateType = this.type == 1 ? '质保单':'标签'
            if(!this.form.templateName){
                alert('请输入' + templateType +'名称');
                this.$refs.templateName.$el.querySelector('input').focus()
                return
            }
            if(!this.form.height){
                alert('请输入模板高度');
                this.$refs.height.$el.querySelector('input').focus()
                return
            }
            if(!this.form.width){
                alert('请输入模板宽度');
                this.$refs.width.$el.querySelector('input').focus()
                return
            }
            if(this.type ==1 && !this.form.shopId){
                alert('请选择店铺');
                return
            }
            let content = JSON.stringify({
                percentage: 100,
                width: this.form.width,
                height: this.form.height,
                backgroundImage: '',
                rotateDeg: 0,
                components: [

                ],
                containers: [

                ]
            })
            this.$emit('create_template', this.type, {shopName: this.shopName, content: content, ...this.form})
        },
        changeTemplateSize(value){
            if(value){
                this.form.width = this.currentTemplateSize.split('x')[0] || ''
                this.form.height = this.currentTemplateSize.split('x')[1] || ''
            }
        },
        customTemplateSize(){
            this.currentTemplateSize = ''
        }
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
                    .width-text, .height-text {
                        margin-right: 14px;
                        vertical-align: middle;
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
