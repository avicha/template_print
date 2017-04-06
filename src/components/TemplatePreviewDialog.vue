<template>
<el-dialog class="template-preview-dialog" v-model="isShown" @close="onCloseHandler" :close-on-click-modal="false" size="small">
    <div :style="{height: carouselHeight + 'px'}" v-if="pageNumber==1">
        <TemplatePreviewCanvasComponent :canvas="canvas" :templateData="templateData" :page="1" :isPrintCanvas="false"></TemplatePreviewCanvasComponent>
    </div>
    <Swiper :carouselWidth="carouselWidth" :carouselHeight="carouselHeight" :pageNumber="pageNumber" v-else>
        <SwiperSlide v-for="i in pageNumber">
            <TemplatePreviewCanvasComponent :canvas="canvas" :templateData="templateData" :page="i" :isPrintCanvas="false"></TemplatePreviewCanvasComponent>
        </SwiperSlide>
    </Swiper>
    <i class="icon icon-close" @click="close"></i>
    <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="close">取 消</el-button>
        <el-button class="confirm" @click="printTemplate">打 印</el-button>
    </div>
</el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Button} from 'element-ui'
import {Swiper, SwiperSlide} from './swiper/index'
Vue.use(Dialog)
Vue.use(Button)


import TemplatePreviewCanvasComponent from './TemplatePreviewCanvas'
import extend from 'lodash/extend'

export default {
    name: 'TemplatePreviewDialog',
    props: ['canvas', 'templateData', 'pageNumber'],
    data() {
        return {
            isShown: false,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            swiperOption: {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                paginationBulletRender(swiper, index, className) {
                    return '<span class="' + className + ' swiper-pagination-bullet-custom">' + (index + 1) + '</span>'
                }
            }
        }
    },
    computed:{
        carouselWidth(){
            return this.windowWidth * 0.5 - 2 * 20
        },
        carouselHeight(){
            return this.windowHeight * 0.6 - 55
        }
    },
    components: {
        TemplatePreviewCanvasComponent,
        Swiper,
        SwiperSlide,
    },
    methods:{
        close(){
            this.isShown = false
        },
        show(){
            this.isShown = true
        },
        onCloseHandler(){
            this.$emit('close')
        },
        printTemplate(){
            this.$emit('print')
        },
        setWindowSize(){
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
        }
    },
    mounted(){
        window.addEventListener('resize', this.setWindowSize)
        this.$on('set_data', data => {
            data = JSON.parse(JSON.stringify(data))
            extend(this.$data, data)
        })
    },
    destroyed(){
        window.removeEventListener('resize', this.setWindowSize)
    },
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