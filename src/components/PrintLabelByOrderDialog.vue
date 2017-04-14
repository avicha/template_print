<template>
    <el-dialog class="order-product-list-dialog" title="商品标签" v-model="isShown" @open="loadData" @close="reset" :close-on-click-modal="false" size="large">
        <div class="content">
            <div class="menu-bar">
                <el-input v-model="searchText" class="search-input" :autofocus="true" icon="search" :on-icon-click="search"></el-input>
                <label>模板</label>
                <el-select class="template-selector" v-model="templateId" placeholder="请选择">
                    <el-option :label="labelTemplate.templateName" :value="labelTemplate.templateId" v-for="labelTemplate in labelTemplateList">
                    </el-option>
                </el-select>
                <el-button class="preview-btn" @click="preview(false)">预览</el-button>
            </div>
            <table class="product-list-table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <td></td>
                        <td>序号</td>
                        <td>条码号</td>
                        <td>当前状态</td>
                        <td>首饰名称</td>
                        <td>总件重（g）</td>
                        <td>售价（元）</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in productList">
                        <td class="checkbox"><input type="checkbox" :checked="selectedProducts.includes(product.productId)" @change="toggleProduct(product.productId)"></td>
                        <td class="num">{{ product.num }}</td>
                        <td class="barcode">{{ product.barcode }}</td>
                        <td class="status">{{ product.status }}</td>
                        <td class="jewelry">{{ product.jewelry }}</td>
                        <td class="weight">{{ product.weight }}g</td>
                        <td class="price">¥{{ product.price }}</td>
                    </tr>
                </tbody>
            </table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, slot, prev, pager, next, jumper"
                :total="totalNum">
                <span class="page-size">{{pageSize}}条/页</span>
            </el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="preview(true)">打 印</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Button, Input, Pagination} from 'element-ui'
import find from 'lodash/find'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)

export default {
    data(){
        return {
            isShown: false,
            currentPage: 1,
            pageSize: 8,
            searchText: '',
            templateId: '',
            selectedProducts: [],
        }
    },
    props: ['labelTemplateList', 'productList', 'orderNum', 'totalNum'],
    watch:{
        labelTemplateList(){
            let defaultTemplate = find(this.labelTemplateList, {defaultFlag: 'Y'})
            if(defaultTemplate){
                this.templateId = defaultTemplate.templateId
            }
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
        reset(){
            this.currentPage = 1
            this.searchText = ''
            this.selectedProducts = []
            window.removeEventListener('keydown', this.keydownHandler)
        },
        //按下回车删除模板
        keydownHandler(e){
            if(e.keyCode == 13){
                this.search()
            }
        },
        loadData(){
            this.$emit('requestProductList', {orderNum: this.orderNum, page: this.currentPage, pageSize: this.pageSize})
        },
        search(){
            this.currentPage = 1
            if(this.searchText){
                this.$emit('requestProductList', {searchKey: this.searchText, page: this.currentPage, pageSize: this.pageSize})    
            } else {
                this.$emit('requestProductList', {orderNum: this.orderNum, page: this.currentPage, pageSize: this.pageSize})
            }
        },
        toggleProduct(productId){
            if(this.selectedProducts.includes(productId)){
                let i = this.selectedProducts.indexOf(productId)
                this.selectedProducts.splice(i, 1)
            } else {
                this.selectedProducts.push(productId)
            }
        },
        preview(isPrint){
            if(this.templateId){
                if(!isPrint || this.selectedProducts.length){
                    this.$store.dispatch('previewTemplate', this.templateId).then(json => {
                        if(json.state == 200){
                            let canvas = json.data.content
                            this.$emit('previewTemplate', JSON.parse(canvas), this.selectedProducts, isPrint)
                        }
                    })
                }
            }
        },
        handleCurrentChange(page){
            this.currentPage = page
            if(this.searchText){
                this.$emit('requestProductList', {searchKey: this.searchText, page: this.currentPage, pageSize: this.pageSize})
            } else {
                this.$emit('requestProductList', {orderNum: this.orderNum, page: this.currentPage, pageSize: this.pageSize})
            }
        }
    },
}

</script>

<style lang="scss">
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.order-product-list-dialog {
    @import "../assets/scss/dialog.scss";
    .el-dialog {
        width: 1000px; 
        .el-dialog__body {
            padding: 0;
            .content {
                .menu-bar {
                    padding: 20px 30px;
                    label {
                        margin-right: 10px;
                    }
                    >.el-input, >.el-select {
                        width: 300px;
                        margin-right: 30px;
                        .el-input__inner {
                            height: 30px;
                            @include BD1;
                            @include TC1;
                            &:focus, &:hover {
                                @include BD1;
                            }
                        }
                    }
                    .template-selector {
                        margin-right: 20px;
                    }
                    .preview-btn {
                        padding: 7px 15px;
                        @include TC4;
                        border: 1px solid $C1;
                    }
                }
                .product-list-table {
                    width: 100%;
                    margin-bottom: 20px;
                    thead {
                        background-color: #e8e9eb;
                        td {
                            height: 44px;
                            @include F(12);
                            @include TC2;
                            font-weight: bold;
                        }
                    }
                    tbody {
                        tr {
                            td {
                                height: 44px;
                                line-height: 44px;
                                border-bottom: 1px solid #d6d6d6;
                            }
                            .checkbox {
                                width: 130px;
                                input[type="checkbox"] {
                                    display: block;
                                    width: 20px;
                                    height: 20px;
                                    margin-left: 30px;
                                    @include BD1;
                                    border-radius: 50%;
                                }
                            }
                            .num {
                                width: 104px;
                                @include F(12);
                                font-weight: bold;
                            }
                            .barcode {
                                width: 136px;
                            }
                            .status {
                                width: 128px;
                            }
                            .weight {
                                width: 116px;
                            }
                            .price {

                            }
                        }
                    }
                }
                .el-pagination {
                    text-align: center;
                    .page-size {
                        margin-right: 10px;
                    }
                    .el-pager {
                        .number {
                            @include TC2;
                            @include F(12);
                            @include BD1;
                            border-right: 0;
                            background-color: #fff;
                            
                            &.active {
                                @include TC4;
                            }
                            &:last-child {
                                border-right: 1px solid #d6d6d6;
                            } 
                        }
                    }
                    button {
                        color: $C3;
                        &:focus, &:hover {
                            color: $C3;
                        }
                    }
                    .el-pagination__jump {
                        .el-pagination__editor {
                            @include BD1;
                            @include TC1;
                            &:focus, &:hover {
                                @include BD1;
                            }
                        }
                    }

                }
            }
        }
    }
}
</style>