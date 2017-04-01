<template>
    <el-dialog class="rename-template-dialog" title="重命名" v-model="isShown" @close="reset" :close-on-click-modal="false" size="tiny">
        <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent="renameTemplate">
            <el-form-item label="名称" prop="templateName">
                <el-input ref="templateName" v-model.trim="form.templateName" :maxlength="20" :autofocus="true" :icon="form.templateName? 'empty':''" :on-icon-click="()=>{form.templateName=''}"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="renameTemplate">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Form, FormItem, Input, Button} from 'element-ui'
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

import extend from 'lodash/extend'
import find from 'lodash/find'

export default {
    name: 'RenameTemplateDialog',
    props: ['qualityList', 'labelList'],
    data() {
        return {
            isShown: false,
            type: null,
            form:{
                templateId: null,
                templateName: '',
            },
            rules:{
                templateName: [
                    {validator:(rule, value, callback)=>{
                        if(value === ''){
                            this.$refs.templateName.$el.querySelector('input').focus()
                            callback(new Error('请输入' + this.templateType + '名称'))
                        } else {
                            if(value.length >20){
                                this.$refs.templateName.$el.querySelector('input').focus()
                                callback(new Error('名称长度不能超过20个字符'))
                            } else {
                                let list = this.type == 1? this.qualityList:this.labelList
                                let template = find(list, {templateName: value})
                                if(template && template.templateId != this.form.templateId){
                                    callback(new Error('该' + this.templateType + '名称已存在，请重新输入'))
                                } else {
                                    callback()
                                }
                            }
                        }
                    }, trigger: 'blur'},
                ],
            }
        }
    },
    computed:{
        templateType(){
            return this.type == 1 ? '质保单':'标签'
        }
    },
    methods:{
        close(){
            this.isShown = false
        },
        show(){
            this.isShown = true
        },
        reset(){
            this.$refs.form.resetFields()
        },
        renameTemplate(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    this.$emit('rename_template', this.type, this.form)
                }
            })
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

.rename-template-dialog {
    @import "../assets/scss/dialog.scss";    
}
</style>
