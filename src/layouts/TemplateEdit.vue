<template>
    <div>
        <div class="template-edit-page">
            <div class="breadcrumb">
                <router-link class="breadcrumb-item" :to="{ name: 'Index' }" exact>返回上一级</router-link>
                <span class="breadcrumb-item">工作</span>
                <span class="breadcrumb-item">打印模板</span>
                <span class="breadcrumb-item">新建质保单</span>
            </div>
            <div class="template-edit-content">
                <TemplateEditor ref="templateEditor" :propList="propList" :template="template" :templateData="templateData" @preview="previewTemplate" @loadQualityTemplateData="loadQualityTemplateData" @openLoadLabelTemplateDataDialog="openLoadLabelTemplateDataDialog"></TemplateEditor>    
            </div>
            <TemplatePreviewDialog ref="templatePreviewDialog" @print="printTemplate" :canvas="canvas" :templateData="templateData" :pageNumber="pageNumber"></TemplatePreviewDialog>
            <LoadLabelTemplateDataDialog ref="loadLabelTemplateDataDialog" @loadLabelTemplateData="loadLabelTemplateData"></LoadLabelTemplateDataDialog>
        </div>
        <TemplatePreviewCanvasComponent class="template-print-canvas" style="padding-top: 0; padding-left: 0" :canvas="canvas" :templateData="templateData" v-for="i in pageNumber" :page="i" :pageNumber="pageNumber"></TemplatePreviewCanvasComponent>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import Vue from 'vue'
import TemplateEditor from '../components/TemplateEditor'
import TemplatePreviewDialog from '../components/TemplatePreviewDialog'
import LoadLabelTemplateDataDialog from '../components/LoadLabelTemplateDataDialog'
import TemplatePreviewCanvasComponent from '../components/TemplatePreviewCanvas'

export default {
    name: 'TemplateEditPage',
    data(){
        return {
            templateId: this.$route.query.templateId,
            canvas: {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: [
                    
                ],
                containers: [

                ]
            },
            templateData: {
                productList: []
            }
        }
    },
    computed: {
        //打印总页数
        pageNumber(){
            let number = 0
            this.canvas.components.forEach(component => {
                if(component.type == 'ItemListComponent'){
                    number = component.data.number
                }
            })
            //如果没有list，则返回一页
            if(!number){
                return 1
            } else {
                //否则返回页数，没有数据则打印1页
                return Math.ceil(this.templateData.productList.length/number) || 1
            }
        },
        //返回state的属性列表和模板详情到编辑器
        ...mapState({
            propList: state => state.template.propList,
            template: state => state.template.detail,
        })
    },
    components:{
        TemplateEditor,
        TemplatePreviewDialog,
        LoadLabelTemplateDataDialog,
        TemplatePreviewCanvasComponent,
    },
    methods:{
        //键盘处理函数，处理删除，复制，粘贴组件
        keydownHandler(e){
            if(!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)){
                switch(e.keyCode){
                    case 8:
                        this.$refs.templateEditor.$emit('delete_keyup', e)
                        break
                    case 67:
                        if(e.ctrlKey || e.metaKey){
                            this.$refs.templateEditor.$emit('copy_keyup', e)
                        }
                        break
                    case 86:
                        if(e.ctrlKey || e.metaKey){
                            this.$refs.templateEditor.$emit('paste_keyup', e)
                        }
                        break
                    case 90:
                        if(e.ctrlKey || e.metaKey){
                            this.$refs.templateEditor.$emit('undo_keyup', e)
                        }
                        break
                    case 37:
                        this.$refs.templateEditor.$emit('move_keyup', 'left')
                        break
                    case 38:
                        this.$refs.templateEditor.$emit('move_keyup', 'up')
                        break
                    case 39:
                        this.$refs.templateEditor.$emit('move_keyup', 'right')
                        break
                    case 40:
                        this.$refs.templateEditor.$emit('move_keyup', 'down')
                        break
                }
                e.preventDefault()
            }
            return false
        },
        //预览模板
        previewTemplate(canvas){
            this.canvas = JSON.parse(JSON.stringify(canvas))
            this.$refs.templatePreviewDialog.show()
        },
        //打印模板
        printTemplate(){
            Vue.nextTick(() => {
                window.print()
            })
        },
        //加载数据用于预览效果
        loadQualityTemplateData(){
            this.$store.dispatch('getPrintQualityData', {orderId: Date.now(), isTmp: 1}).then(json => {
                if(json.state == 200){
                    this.templateData = json.data
                }
            })
        },
        openLoadLabelTemplateDataDialog(){
            this.$refs.loadLabelTemplateDataDialog.show()
        },
        loadLabelTemplateData(productType){
            this.$store.dispatch('getPrintLabelData', {isTmp: 1, productType: productType}).then(json => {
                if(json.state == 200){
                    this.templateData = json.data
                    this.$refs.loadLabelTemplateDataDialog.close()
                }
            })
        }
    },
    mounted(){
        //请求模板的详情，然后根据模板类型请求属性作为菜单，并把模板的画布内容初始化到编辑器上
        this.$store.dispatch('previewTemplate', this.templateId).then(json => {
            if(json.state == 200){
                this.$refs.templateEditor.$emit('set_canvas', json.data.content)
                this.$store.dispatch('getPrintMenuData', json.data.type)
            }
        })
        //初始化键盘事件
        window.addEventListener('keydown', this.keydownHandler)
    },
    destroyed(){
        //移除组件时移除键盘事件
        window.removeEventListener('keydown', this.keydownHandler)
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
@media screen {
    .template-edit-page {
        display: block;
        overflow: scroll;
        padding: 0 20px;
        @import "../assets/scss/breadcrumb.scss";
        .template-edit-content {
            .template-editor {
                position: absolute;
                top: 60px;
                bottom: 0;
                left: 20px;
                right: 20px;
            }
        }
    }
    .template-print-canvas {
        display: none;
    }  
}

@media print {
    .template-edit-page {
        display: none;
    }
    .template-print-canvas {
        display: block;
    }
}
</style>
