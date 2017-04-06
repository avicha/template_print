<template>
<div class="image-component" :style="componentStyle" @dblclick="openFileUploadDialog">
    <img :src="src">
    <input ref="imageInput" type="file" class="image-input" accept="image/*" @change="changeURL">
    <div class="resize"></div>
</div>
</template>

<script>
import {readImageAsDataURL, getComponentTranslate, getAppSign, uploadFile, transformFileURL} from '../services/utils'
export default {
    props: ['data', 'parent'],
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
                this.$refs.imageInput.click()
            }
        },
        changeURL(e){
            let file = e.target.files[0]
            let filename = Date.now() + '_' + encodeURIComponent(file.name)
            getAppSign({filename: filename, postFile: '/printTemplate/'}, (error, sign) => {
                if(error){
                    alert(error)
                } else {
                    uploadFile({file, sign, insertOnly: 0, filename}, (error, res) => {
                        if(error){
                            alert(error)
                        } else {
                            this.$emit('changeComponentData', {data: {src: res.resource_path}, shouldUpdate: false, record: true})
                        }
                    })
                }
            })
            // if(e.target.files){
            //     let file = e.target.files[0]
            //     if(file){
            //         readImageAsDataURL(file, (error, base64URL, imageInfo) => {
            //             if(error){
            //                 alert(error)
            //             } else {
            //                 this.$emit('changeComponentData', {data: {src: base64URL}, shouldUpdate: false, record: true})
            //             }
            //         })
            //     }
            // } else {
            //     let src = e.target.value
            //     this.$emit('changeComponentData', {data: {src: src}, shouldUpdate: false, record: true})
            // }
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