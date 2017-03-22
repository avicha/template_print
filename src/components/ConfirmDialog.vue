<template>
    <el-dialog class="confirm-dialog" :title="title" v-model="isShown" :close-on-click-modal="false" size="tiny">
        <p class="dialog-content">{{ content }}</p>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="onConfirmHandler">确 定</el-button>
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
    name: 'ConfirmDialog',
    data() {
        return {
            isShown: false,
        }
    },
    props: ['title', 'content', 'onConfirmHandler'],
    methods:{
        close(){
            this.isShown = false
        },
        show(){
            this.isShown = true
        }
    },
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.confirm-dialog {
    @import "../assets/scss/dialog.scss";
    .dialog-content {
        text-align: center;
    }
}
</style>
