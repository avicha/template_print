<template>
    <el-dialog class="load-label-template-data-dialog" title="数据载入" v-model="isShown" :close-on-click-modal="false" size="tiny">
        <el-form>
            <el-form-item label="选择数据">
                <el-select v-model="type" placeholder="请选择">
                    <el-option label="素金类" :value="1">
                    </el-option>
                    <el-option label="珠宝类" :value="2">
                    </el-option>
                    <el-option label="银饰类" :value="3">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="close">取 消</el-button>
            <el-button class="confirm" @click="loadLabelTemplateData">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import {Dialog, Form, FormItem, Select, Option, Button} from 'element-ui'
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)

import extend from 'lodash/extend'

export default {
    name: 'SetDefaultTemplateDialog',
    data() {
        return {
            isShown: false,
            type: 1,
        }
    },
    methods:{
        close(){
            this.isShown = false
        },
        show(){
            this.isShown = true
        },
        loadLabelTemplateData(){
            this.$emit('loadLabelTemplateData', this.type)
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
.el-select-dropdown {
    .el-select-dropdown__item{
        &.selected {
            background-color: $C2;
            color: #48576a;
        }
        &.hover {
            background-color: $C2;
            @include TC3;
        }
    }
}
.load-label-template-data-dialog {
    .el-dialog {
        width: 380px;
        .el-dialog__header {
            text-align: center;
            .el-dialog__title {
                font-weight: normal;
                @include F(16);
                @include TC1;
            }
        }
        .el-form {
            padding: 0 20px;
            .el-select {
                width: 100%;
            }
        }
        .dialog-footer {
            text-align: center;
            .el-button {
                width: 120px;
                padding: 7px 10px;
                &.cancel {
                    @include BD1;
                    @include TC7;
                    margin-right: 40px;
                }
                &.confirm {
                    margin-left: 0;
                    background-color: $C4;
                    border-color: $C1;
                    @include TC6;
                    box-shadow: 0 0 6px $C3;  
                }
            }
        }
    }
}
</style>
