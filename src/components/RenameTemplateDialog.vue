<template>
    <el-dialog class="rename-template-dialog" title="重命名" v-model="isShown" :close-on-click-modal="false" size="tiny">
        <el-form :model="form" @submit.native.prevent>
            <el-form-item label="名称">
                <el-input ref="templateName" v-model="form.templateName" :autofocus="true" :icon="form.templateName? 'empty':''" :on-icon-click="()=>{form.templateName=''}"></el-input>
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

export default {
    name: 'RenameTemplateDialog',
    data() {
        return {
            isShown: false,
            type: null,
            form:{
                templateId: null,
                templateName: '',
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
        renameTemplate(){
            if(!this.form.templateName){
                alert('请填写模板名称');
                this.$refs.templateName.$el.querySelector('input').focus()
            } else {
                this.$emit('rename_template', this.type, this.form)
            }
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
