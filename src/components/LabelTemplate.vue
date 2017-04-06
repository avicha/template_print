<template>
    <div class="label-template">
        <div class="thumbnail-container" @mouseleave="active = false">
            <router-link :to="{name: 'TemplateEdit', query: {templateId: labelTemplate.templateId}}" exact>
                <div class="pic" :style="picStyle"></div>
            </router-link>
            <i class="icon default-icon" v-show="labelTemplate.defaultFlag=='Y'"></i>
            <div class="operation-container" :class="{active: active}" @mouseenter="active = true" @mouseleave="active = false">
                <ul class="operation-list">
                    <li class="operation" @click="openRenameTemplateDialog(2, labelTemplate)">重命名</li>
                    <li class="operation" @click="openCopyTemplateDialog(2, labelTemplate)">复制</li>
                    <li class="operation" @click="openSetDefaultDialog(labelTemplate.templateId)">设置默认</li>
                    <li class="operation" @click="previewTemplate(2, labelTemplate)">预览</li>
                    <li class="operation delete-operation" @click="openDeleteTemplateDialog(2, labelTemplate.templateId)">删除</li>
                </ul>
                <i class="el-icon-more" title="更多选项"></i>
            </div>
        </div>
        <p class="label-name">{{labelTemplate.templateName}}</p>
    </div>
</template>

<script>
import {createImageByTemplateCanvas} from '../services/utils'
export default {
    name: 'LabelTemplateComponent',
    data(){
        return {
            active: false,
            url: '',
        }
    },
    computed:{
        picStyle() {
            return {
                backgroundImage: 'url(' + this.url + ')',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }
        }
    },
    props: ['labelTemplate', 'openRenameTemplateDialog', 'openCopyTemplateDialog', 'openSetDefaultDialog', 'previewTemplate', 'openDeleteTemplateDialog'],
    mounted(){
        createImageByTemplateCanvas(JSON.parse(this.labelTemplate.content), (error, dataURL) => {
            if(error){
                alert(error)
            } else {
                this.url = dataURL
            }
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/colors.scss";
@import "../assets/scss/fonts.scss";
.label-template{
    display: block;
    .thumbnail-container{
        position: relative;
        .pic{
            display: block;
            box-sizing: border-box;
            width: 100%;
            border-radius: 4px;
            @include BD2;
            padding-bottom: 75%;
            &:hover {
                box-shadow: 0 0 6px $C3;
            }
        }
        .default-icon {
            @include top-right;
        }
        .operation-container{
            display: none;
            @include bottom-right;
            padding-right: 9px;
            text-align: right;
            .operation-list{
                display: none;
                background-color: $C2;
                @include BD1;
                .operation{
                    cursor: pointer;
                    list-style-type: none;
                    width: 140px;
                    text-align: left;
                    @include F(12);
                    line-height: 2;
                    padding-left: 20px;
                    &:hover {
                        @include TC4;
                    }
                }
                .delete-operation {
                    border-top: 1px solid $C3;
                    &:hover {
                        @include TC5;
                    }
                }
            }
            .el-icon-more {
                cursor: pointer;
            }
            &.active {
                .operation-list {
                    display: block;
                }
                .el-icon-more {
                    @include TC3;
                }
            }
        }
        &:hover{
            .operation-container{
                display: block;
            }
        }
    }
    .label-name{
        text-align: center;
        margin-top: 20px;
        line-height: 1;
        @include text-ellipsis;
        @include F(12);
        @include TC2;
    }
}
</style>
