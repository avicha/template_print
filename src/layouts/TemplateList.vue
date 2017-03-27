<template>
    <div>
        <div class="template-list-page">
            <div class="breadcrumb">
                <router-link class="breadcrumb-item" :to="{ name: 'Index' }" exact>返回上一级</router-link>
                <span class="breadcrumb-item">工作</span>
                <span class="breadcrumb-item">打印模板</span>
            </div>
            <div class="template-list-content">
                <div class="operation-dropdown-container">
                    <div class="operation-dropdown-menu-list">
                        <el-button class="el-dropdown-link" type="primary">
                            <i class="icon icon-create"></i>+新建
                        </el-button>
                        <ul class="dropdown">
                            <li class="dropdown-item" @click="showCreateTemplateDialog(1)">新建质保单</li>
                            <li class="dropdown-item" @click="showCreateTemplateDialog(2)">新建标签</li>
                        </ul>
                    </div>
                </div>
                <div class="template-list-container">
                    <p class="quality-list-text">
                        <span>质保单</span>
                    </p>
                    <el-row class="quality-list" justify="space-between" :gutter="20">
                        <el-col :span="4" v-for="qualityTemplate in qualityList">
                            <QualityTemplate 
                            :qualityTemplate="qualityTemplate"
                            :openRenameTemplateDialog="openRenameTemplateDialog"
                            :openCopyTemplateDialog="openCopyTemplateDialog"
                            :openSetDefaultDialog="openSetDefaultDialog"
                            :previewTemplate="previewTemplate"
                            :openDeleteTemplateDialog="openDeleteTemplateDialog"
                            :key="qualityTemplate.templateId">
                            </QualityTemplate>
                        </el-col>
                    </el-row>
                    <p class="label-list-text">
                        <span>标签</span>
                    </p>
                    <el-row class="label-list" justify="space-between" :gutter="20">
                        <el-col :span="4" v-for="labelTemplate in labelList">
                            <LabelTemplate 
                                :labelTemplate="labelTemplate"
                                :openRenameTemplateDialog="openRenameTemplateDialog"
                                :openCopyTemplateDialog="openCopyTemplateDialog"
                                :openSetDefaultDialog="openSetDefaultDialog"
                                :previewTemplate="previewTemplate"
                                :openDeleteTemplateDialog="openDeleteTemplateDialog"
                                :key="labelTemplate.templateId">
                            </LabelTemplate>
                        </el-col>
                    </el-row>
                </div>
                <RenameTemplateDialog ref="renameTemplateDialog" @rename_template="renameTemplate"></RenameTemplateDialog>
                <CopyTemplateDialog ref="copyTemplateDialog" @copy_template="copyTemplate"></CopyTemplateDialog>
                <SetDefaultTemplateDialog ref="setDefaultTemplateDialog" @set_default_template="setDefaultTemplate"></SetDefaultTemplateDialog>
                <DeleteTemplateDialog ref="deleteTemplateDialog" @delete_template="deleteTemplate"></DeleteTemplateDialog>
                <CreateTemplateDialog ref="createTemplateDialog" @create_template="createTemplate" :shopList="shopList" :templateSizeList="templateSizeList"></CreateTemplateDialog>
                <TemplatePreviewDialog ref="templatePreviewDialog" @print="printTemplate" :canvas="canvas" :templateData="templateData" :pageNumber="pageNumber"></TemplatePreviewDialog>
                <LoadLabelTemplateDataDialog ref="loadLabelTemplateDataDialog" @loadLabelTemplateData="loadLabelTemplateData"></LoadLabelTemplateDataDialog>
            </div>
        </div>
        <TemplatePreviewCanvasComponent class="template-print-canvas" style="padding-top: 0; padding-left: 0" :canvas="canvas" :templateData="templateData" v-for="i in pageNumber" :page="i" :pageNumber="pageNumber"></TemplatePreviewCanvasComponent>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import Vue from 'vue'
import {Breadcrumb, BreadcrumbItem, Button, Dropdown, DropdownMenu, DropdownItem, Row, Col} from 'element-ui'
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)

import QualityTemplate from 'components/QualityTemplate'
import LabelTemplate from 'components/LabelTemplate'
import RenameTemplateDialog from 'components/RenameTemplateDialog'
import CopyTemplateDialog from 'components/CopyTemplateDialog'
import SetDefaultTemplateDialog from 'components/SetDefaultTemplateDialog'
import DeleteTemplateDialog from 'components/DeleteTemplateDialog'
import CreateTemplateDialog from 'components/CreateTemplateDialog'
import TemplatePreviewDialog from '../components/TemplatePreviewDialog'
import LoadLabelTemplateDataDialog from '../components/LoadLabelTemplateDataDialog'
import TemplatePreviewCanvasComponent from '../components/TemplatePreviewCanvas'
import * as types from '../store/mutation_types'

export default {
    name: 'TemplateListPage',
    data(){
        return {
            canvas: {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: [
                    
                ],
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
        ...mapState({
            qualityList: state => state.template.qualityList,
            labelList: state => state.template.labelList,
            shopList: state => state.template.shopList,
            templateSizeList: state => state.template.templateSizeList,
        })
    },
    components:{
        QualityTemplate,
        LabelTemplate,
        RenameTemplateDialog,
        CopyTemplateDialog,
        SetDefaultTemplateDialog,
        DeleteTemplateDialog,
        CreateTemplateDialog,
        TemplatePreviewDialog,
        LoadLabelTemplateDataDialog,
        TemplatePreviewCanvasComponent,
    },
    methods:{
        openRenameTemplateDialog(type, {templateId, templateName}){
            this.$refs.renameTemplateDialog.$emit('set_data', {
                type,
                form:{
                    templateId,
                    templateName,    
                }
            })
            this.$refs.renameTemplateDialog.show()
        },
        openCopyTemplateDialog(type, {templateName, width, height, content, shopId, shopName}){
            this.$refs.copyTemplateDialog.$emit('set_data', {
                type,
                form: {
                    templateName: templateName + '-副本', 
                    width,
                    height,
                    content, 
                    shopId,
                    shopName,
                }
            })
            this.$refs.copyTemplateDialog.show()
        },
        openSetDefaultDialog(templateId){
            this.$refs.setDefaultTemplateDialog.$emit('set_data', {templateId: templateId})
            this.$refs.setDefaultTemplateDialog.show()
        },
        openDeleteTemplateDialog(type, templateId){
            this.$refs.deleteTemplateDialog.$emit('set_data', {
                type,
                templateId,
            })
            this.$refs.deleteTemplateDialog.show()
        },
        showCreateTemplateDialog(type){
            this.$store.dispatch('getPrintShopData', type)
            this.$refs.createTemplateDialog.$emit('set_data', {
                type,
                form: {
                    templateName: '',
                    shopId: '', 
                    width: 0,
                    height: 0
                }
            })
            this.$refs.createTemplateDialog.show()
        },
        copyTemplate(type, templateData){
            this.$store.dispatch('createTemplate', templateData).then(json => {
                if(json.state == 200){
                    this.$refs.copyTemplateDialog.close()
                    templateData.templateId = json.data.templateId
                    this.$store.commit(type == 1? types.QUALITY_TEMPLATE_LIST_APPEND : types.LABEL_TEMPLATE_LIST_APPEND, templateData)
                }
            })
        },
        deleteTemplate(type, templateId){
            this.$store.dispatch('deleteTemplate', templateId).then(json => {
                if(json.state == 200){
                    this.$refs.deleteTemplateDialog.close()
                    this.$store.commit(type == 1? types.QUALITY_TEMPLATE_LIST_REMOVE : types.LABEL_TEMPLATE_LIST_REMOVE, templateId)
                }
            })
        },
        renameTemplate(type, templateData){
            this.$store.dispatch('updateTemplate', templateData).then(json => {
                if(json.state == 200){
                    this.$refs.renameTemplateDialog.close()
                    this.$store.commit(type == 1? types.QUALITY_TEMPLATE_LIST_UPDATED : types.LABEL_TEMPLATE_LIST_UPDATED, templateData)
                }
            })
        },
        setDefaultTemplate(templateId){
            this.$store.dispatch('setDefaultTemplate', templateId).then(json => {
                if(json.state == 200){
                    this.$refs.setDefaultTemplateDialog.close()
                    this.$store.dispatch('getTemplateList')
                }
            })
        },
        createTemplate(type, templateData){
            this.$store.dispatch('createTemplate', templateData).then(json => {
                if(json.state == 200){
                    this.$refs.createTemplateDialog.close()
                    templateData.templateId = json.data.templateId
                    this.$store.commit(type == 1? types.QUALITY_TEMPLATE_LIST_APPEND : types.LABEL_TEMPLATE_LIST_APPEND, templateData)
                    this.$router.push({name: 'TemplateEdit', query: { templateId: templateData.templateId }})
                }
            })
        },
        //预览模板
        previewTemplate(type, {content}){
            this.canvas = JSON.parse(content)
            if(type == 1){
                this.loadQualityTemplateData()
            } else {
                this.openLoadLabelTemplateDataDialog()
            }
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
                    this.$refs.templatePreviewDialog.show()
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
                    this.$refs.templatePreviewDialog.show()
                }
            })
        }
    },
    mounted(){
        this.$store.dispatch('getTemplateList')
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
@media screen {
    .template-list-page {
        padding: 0 20px;
        @import "../assets/scss/breadcrumb.scss";
        .template-list-content{
            background-color: $C2;
            .operation-dropdown-container{
                .operation-dropdown-menu-list{
                    float: right;
                    margin-right: 20px;
                    margin-top: 14px;
                    position: relative;
                    .el-button {
                        padding: 7px 10px;
                        background-color: $C1;
                        border-color: $C1;
                        width: 100px;
                    }
                    .dropdown {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        box-shadow: 0 0 6px $C3;
                        background-color: $C2;
                        z-index: 1000;
                        .dropdown-item {
                            list-style: none;
                            cursor: pointer;
                            height: 36px;
                            line-height: 36px;
                            padding-left: 15px;
                            @include F(14);
                            @include TC1;
                            &:hover {
                                @include TC4;
                            }
                        }
                    }
                    &:hover {
                        .dropdown {
                            display: block;
                        }
                    }
                }
            }
            .template-list-container {
                padding: 0 20px;
                .quality-list-text, .label-list-text {
                    padding: 30px 0 20px;
                    span {
                        @include F(18);
                        font-weight: bold;
                        padding-left: 10px;
                        border-left: 5px solid $C1;  
                    }
                }
                .label-list-text {
                    padding-top: 10px;
                }
                .quality-list, .label-list{
                    &:after{
                        @include clearFix;
                    }
                }
                .quality-template, .label-template {
                    margin-bottom: 20px;
                }
            }
        }
    }
    .template-print-canvas {
        display: none;
    }
}
@media print {
    .template-list-page {
        display: none;
    }
    .template-print-canvas {
        display: block;
    }
}
</style>
