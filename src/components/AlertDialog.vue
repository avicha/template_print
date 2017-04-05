<template>
    <el-dialog class="alert-dialog" :title="title" v-model="isShown" @close="reset" :close-on-click-modal="false" size="tiny">
        <p class="dialog-content">{{ content }}</p>
        <div slot="footer" class="dialog-footer">
            <el-button class="confirm" @click="close">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Button} from 'element-ui'
Vue.use(Dialog)
Vue.use(Button)

export default {
    name: 'ConfirmDialog',
    data() {
        return {
            isShown: false,
        }
    },
    props: ['title', 'content'],
    methods:{
        close(){
            this.isShown = false
        },
        show(){
            this.isShown = true
            window.addEventListener('keydown', this.keydownHandler)
        },
        //回车默认按确定按钮
        keydownHandler(e){
            if(e.keyCode == 13){
                this.close()
            }
        },
        reset(){
            window.removeEventListener('keydown', this.keydownHandler)
        },
    },
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.alert-dialog {
    @import "../assets/scss/dialog.scss";
    .dialog-content {
        text-align: center;
    }
}
</style>
