<template>
    <div class="quality-template" >
        <div class="thumbnail-container">
            <router-link :to="{name: 'TemplateEdit', query: {templateId: qualityTemplate.templateId}}" exact>
                <div class="pic" :style="picStyle"></div>
            </router-link>
            <i class="icon default-icon" v-show="qualityTemplate.defaultFlag=='Y'"></i>
            <div class="operation-container" :class="{active: active}" @mouseenter="active = true" @mouseleave="active = false">
                <ul class="operation-list">
                    <li class="operation" @click="openRenameTemplateDialog(1, qualityTemplate)">重命名</li>
                    <li class="operation" @click="openCopyTemplateDialog(1, qualityTemplate)">复制</li>
                    <li class="operation" @click="openSetDefaultDialog(qualityTemplate.templateId)">设置默认</li>
                    <li class="operation" @click="previewTemplate(1, qualityTemplate)">预览</li>
                    <li class="operation delete-operation" @click="openDeleteTemplateDialog(1, qualityTemplate.templateId)">删除</li>
                </ul>
                <i class="el-icon-more" title="更多选项"></i>
            </div>
        </div>    
        <p class="quality-name">{{qualityTemplate.templateName}}</p>
        <p class="shop-name">{{qualityTemplate.shopName}}</p>
    </div>
</template>

<script>
import {createImageByTemplateCanvas} from '../services/utils'
export default {
    name: 'QualityTemplateComponent',
    data(){
        return {
            active: false
        }
    },
    computed:{
        picStyle() {
            return {
                backgroundImage: 'url(' + createImageByTemplateCanvas(JSON.parse(this.qualityTemplate.content)) + ')',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }
        }
    },
    props: ['qualityTemplate', 'openRenameTemplateDialog', 'openCopyTemplateDialog', 'openSetDefaultDialog', 'previewTemplate', 'openDeleteTemplateDialog'],
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/colors.scss";
@import "../assets/scss/fonts.scss";
.quality-template{
    display: block;
    .thumbnail-container{
        position: relative;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 6px $C3;
        }
        .pic{
            display: block;
            box-sizing: border-box;
            width: 100%;
            border-radius: 4px;
            @include BD2;
            padding-bottom: 75%;
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
    .quality-name{
        text-align: center;
        margin-top: 20px;
        line-height: 1;
        @include text-ellipsis;
        @include F(12);
        @include TC2;
    }
    .shop-name{
        text-align: center;
        margin-top: 10px;
        @include text-ellipsis;
        @include F(12);
        @include TC1;
    }
}
</style>
