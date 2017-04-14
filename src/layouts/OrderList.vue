<template>
    <div>
        <div class="order-list-page">
            <button @click="printLabel('RK201702284487')">打印标签</button>
            <PrintLabelByOrderDialog ref="printLabelByOrderDialog" :orderNum="currentOrderNum" :labelTemplateList="labelTemplateList" :productList="productList" :totalNum="totalNum" @requestProductList="requestProductList" @printTemplate="printTemplate" @previewTemplate="previewTemplate"></PrintLabelByOrderDialog>
            <TemplatePreviewDialog ref="templatePreviewDialog" @print="printTemplate" :canvas="canvas" :templateData="templateData" :pageNumber="templateData.productList.length"></TemplatePreviewDialog>
        </div>
        <TemplatePreviewCanvasComponent v-show="isPreview" class="template-print-canvas" :isPrintCanvas="true" :canvas="canvas" :templateData="templateData" v-for="i in templateData.productList.length" :page="i"></TemplatePreviewCanvasComponent>
    </div>
</template>

<script>
import Vue from 'vue'
import {
    mapState
} from 'vuex'
import PrintLabelByOrderDialog from '../components/PrintLabelByOrderDialog'
import TemplatePreviewDialog from '../components/TemplatePreviewDialog'
import TemplatePreviewCanvasComponent from '../components/TemplatePreviewCanvas'

export default {
    data(){
        return {
            totalNum: 0,
            productList: [],
            currentOrderNum: null,
            canvas: {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: [
                    
                ],
            },
            isPreview: false,
            templateData: {
                productList: []
            },
        }
    },
    computed:{
        ...mapState({
            labelTemplateList: state => state.template.labelList,
        })
    },
    components: {
        PrintLabelByOrderDialog,
        TemplatePreviewDialog,
        TemplatePreviewCanvasComponent,
    },
    methods:{
        printLabel(orderNum){
            this.currentOrderNum = orderNum
            this.$refs.printLabelByOrderDialog.show()
        },
        requestProductList(filter){
            this.$store.dispatch('getPrintLabelByOrder', filter).then(json => {
                if(json.state == 200){
                    this.productList = json.data.productList
                    this.totalNum = json.data.totalNum
                }
            })
        },
        previewTemplate(canvas, selectedProducts, isPrint){
            this.canvas = canvas
            if(selectedProducts.length){
                this.$store.dispatch('getPrintLabelData', {productList: selectedProducts.map(selectedProduct => {return {productId: selectedProduct}})}).then(json => {
                    if(json.state == 200){
                        this.templateData = json.data
                        this.isPreview = true
                        if(isPrint){
                            Vue.nextTick(() => {
                                window.print()
                            })
                        } else {
                            this.$refs.templatePreviewDialog.show()    
                        }
                    }
                })
            } else {
                this.$store.dispatch('getPrintLabelData', {isTmp: 1, productType: 1}).then(json => {
                    if(json.state == 200){
                        this.templateData.productList = json.data.productList.slice(0, 1)
                        this.isPreview = true
                        if(isPrint){
                            Vue.nextTick(() => {
                                window.print()
                            })
                        } else {
                            this.$refs.templatePreviewDialog.show()    
                        }
                    }
                })
            }
        },
        //预览模板
        printTemplate(){
            Vue.nextTick(() => {
                window.print()
            })
        },
    },
    mounted(){
        this.$store.dispatch('getTemplateList', {type: 2, fieldType: 'simple'})
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
@media screen {
    .order-list-page {
        
    }
    .template-print-canvas {
        opacity: 0;
    }  
}

@media print {
    body {
        background-color: #fff;
    }
    .order-list-page {
        display: none;
    }
    .template-print-canvas {
        opacity: 1;
    }
}
</style>