<template>
    <el-dialog class="set-default-template-dialog" title="设置默认" v-model="isShown" @close="reset" :close-on-click-modal="false" size="tiny">
        <p class="dialog-content">确认要设为默认吗？</p>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="setDefaultTemplate">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Button} from 'element-ui'
Vue.use(Dialog)
Vue.use(Button)

import extend from 'lodash/extend'

export default {
    name: 'SetDefaultTemplateDialog',
    data() {
        return {
            isShown: false,
            templateId: null,
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
                this.setDefaultTemplate()
            }
        },
        reset(){
            window.removeEventListener('keydown', this.keydownHandler)
        },
        setDefaultTemplate(){
            this.$emit('set_default_template', this.templateId)
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
.set-default-template-dialog {
    @import "../assets/scss/dialog.scss";
    .dialog-content {
        text-align: center;
    }
}
</style>
