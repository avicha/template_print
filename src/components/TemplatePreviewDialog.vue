<template>
<el-dialog class="template-preview-dialog" v-model="isShown" :close-on-click-modal="false" size="small">
    <el-carousel :autoplay="false" arrow="always" :height="carouselHeight" trigger="click">
        <el-carousel-item v-for="i in pageNumber">
            <TemplatePreviewCanvasComponent :canvas="canvas" :templateData="templateData" :page="i" :pageNumber="pageNumber"></TemplatePreviewCanvasComponent>
        </el-carousel-item>
    </el-carousel>
    <i class="icon icon-close" @click="close"></i>
    <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="close">取 消</el-button>
        <el-button class="confirm" @click="printTemplate">打 印</el-button>
    </div>
</el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Button, Carousel, CarouselItem} from 'element-ui'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
import TemplatePreviewCanvasComponent from './TemplatePreviewCanvas'
import extend from 'lodash/extend'

export default {
    name: 'TemplatePreviewDialog',
    props: ['canvas', 'templateData', 'pageNumber'],
    data() {
        return {
            isShown: false,
            carouselHeight: (window.innerHeight * 0.6 - 55) + 'px'
        }
    },
    components: {
        TemplatePreviewCanvasComponent
    },
    methods:{
        close(){
            this.isShown = false
        },
        show(){
            this.isShown = true
        },
        printTemplate(){
            this.$emit('print')
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
.template-preview-dialog {
    @import "../assets/scss/dialog.scss";
    .el-dialog {
        width: 50%;
        .el-dialog__header {
            display: none;
        }
        .el-dialog__body {
            padding: 20px;
            position: relative;
            .icon-close {
                width: 50px;
                height: 50px;
                display: block;
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 100;
                background-image: url(~assets/images/close-preview.png);
                background-position: center center;
                background-repeat: no-repeat;
                &:hover {
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, .3);
                    background-image: url(~assets/images/close-preview-hover.png);
                }
            }
        }
        .el-dialog__footer {
            padding: 0;
            padding-bottom: 20px;
        }
    }
}
</style>