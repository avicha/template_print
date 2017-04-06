<template>
<div class="image-component" :style="componentStyle" @dblclick="openFileUploadDialog">
    <img :src="src">
    <div class="resize"></div>
    <FileUploadForm ref="fileUploadForm" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail"></FileUploadForm>
</div>
</template>

<script>
import FileUploadForm from './FileUploadForm'
import {getComponentTranslate, transformFileURL} from '../services/utils'
export default {
    props: ['data', 'parent'],
    components:{
        FileUploadForm
    },
    computed: {
        componentStyle(){
            let top = this.parent ? this.data.top - this.parent.top : this.data.top
            let left = this.parent ? this.data.left - this.parent.left : this.data.left
            return {
                top: top + 'mm',
                left: left + 'mm',
                width: this.data.width + 'mm',
                height: this.data.height + 'mm',
                transform: 'rotate(' + this.data.rotateDeg + 'deg) ' + getComponentTranslate(this.data),
                transformOrigin: '0 0',
                zIndex: this.data.zIndex
            }
        },
        src(){
            if(this.data.src){
                return transformFileURL(this.data.src)
            } else {
                return '/static/images/image-sample.png'
            }
        }
    },
    methods:{
        openFileUploadDialog(){
            if(!this.isPreview){
                this.$refs.fileUploadForm.$emit('upload')
            }
        },
        uploadSuccess(response){
            this.$emit('changeComponentData', {data: {src: response.resource_path}, shouldUpdate: false, record: true})
        },
        uploadFail(error){
            alert(error)
        },
    }
}
</script>

<style lang="scss">
.image-component {
    position: relative;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .image-input {
        display: none;
    }
    .resize {
        display: none;
        position: absolute;
        opacity: 0;
        width: 20px;
        height: 20px;
        top: 100%;
        left: 100%;
        margin-left: -12px;
        margin-top: -12px;
        cursor: nwse-resize;
    }
    &.active {
        opacity: .7;
        border: 1px dashed #4ec0ff;
        .resize {
            display: block;
        }
    }
}
</style>