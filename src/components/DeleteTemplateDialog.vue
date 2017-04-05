<template>
    <el-dialog class="delete-template-dialog" title="删除模板" v-model="isShown" @close="reset" :close-on-click-modal="false" size="tiny">
        <p class="dialog-content">确认要删除此模板吗？</p>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="deleteTemplate">确 定</el-button>
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
    name: 'DeleteTemplateDialog',
    data() {
        return {
            isShown: false,
            type: null,
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
        //按下回车删除模板
        keydownHandler(e){
            if(e.keyCode == 13){
                this.deleteTemplate()
            }
        },
        reset(){
            window.removeEventListener('keydown', this.keydownHandler)
        },
        deleteTemplate(){
            this.$emit('delete_template', this.type, this.templateId)
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
.delete-template-dialog {
    @import "../assets/scss/dialog.scss";
    .el-dialog {
        .el-dialog__header {
            .el-dialog__title {
                @include TC5;
            }    
        }
    }
    .dialog-content {
        text-align: center;
    }
}
</style>
