<template>
    <div class="image-setting">
        <div class="setting-title">
            <span class="setting-span1">基本元件：</span><span class="setting-span2">图片</span>
        </div>
        <div class="setting-body">
            <div class="upload-btn">
                上传图片<FileUploadForm ref="fileUploadForm" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail"></FileUploadForm>
            </div>
            <el-form label-width="80px" label-position="left">
                <el-form-item label="宽">
                    <LengthInput :length="data.width" @change="(value)=>{this.data.width = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="高">
                    <LengthInput :length="data.height" @change="(value)=>{this.data.height = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="横轴">
                    <LengthInput :length="data.left" @change="(value)=>{this.data.left = value}"></LengthInput>
                </el-form-item>
                <el-form-item label="竖轴">
                    <LengthInput :length="data.top" @change="(value)=>{this.data.top = value}"></LengthInput>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {Form, FormItem, Button} from 'element-ui'
import LengthInput from './LengthInput'
import FileUploadForm from './FileUploadForm'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)

export default {
    components: {
        LengthInput,
        FileUploadForm,
    },
    data(){
        return {
            ready: false,
            data: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                src: '',
            }
        }
    },
    watch:{
        data:{
            handler(data){
                if(this.ready){
                    this.$emit('changeComponentSetting', data)
                }
            },
            deep: true
        }
    },
    methods: {
        uploadSuccess(response){
            this.data.src = response.resource_path
        },
        uploadFail(error){
            alert(error)
        },
    },
    mounted(){
        this.$on('set_data', data => {
            this.ready = false
            let dataClone = JSON.parse(JSON.stringify(data))
            for(let key in dataClone){
                if(this.data[key] !== undefined){
                    this.data[key] = dataClone[key]
                }
            }
            Vue.nextTick(() => {
                this.ready = true
            })  
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.image-setting {
    .setting-title {
        padding: 0 20px;
        line-height: 44px;
        .setting-span1 {
            margin-right: 10px;
        }
        .setting-span2 {
            color: #0abfab;
        }
    }
    .setting-body {
        padding-top: 16px;
        padding-bottom: 10px;
        width: 190px;
        margin: 0 auto;
        border-top: 1px solid #d6d6d6;
        .el-form-item {
            height: 26px;
            margin-bottom: 14px;
            &:last-child {
                margin-bottom: 0;
            }
            .el-form-item__content {
                line-height: 26px;
                .el-input {
                    .el-input__inner {
                        width: 66px;
                        height: 26px;
                    }
                }
            }
            label {
                @include text-align-justify;
                font-size: 14px;
                padding: 6px 24px 6px 0;
            }
        }
        .upload-btn {
            width: 190px;
            position: relative;
            padding: 7px 10px;
            text-align: center;
            box-sizing: border-box;
            background-color: $C1;
            @include TC6;
            border-color: $C1;
            margin-bottom: 14px;
        }
    }
}
</style>