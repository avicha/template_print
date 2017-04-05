<template>
<div class="image-component" :style="componentStyle" @dblclick="openFileUploadDialog">
    <img :src="data.src || '/static/images/image-sample.png'">
    <input ref="imageInput" type="file" class="image-input" accept="image/*" @change="changeURL">
    <div class="resize"></div>
</div>
</template>

<script>
import {readImageAsDataURL} from '../services/utils'
export default {
    props: ['data', 'parent'],
    computed: {
        componentStyle(){
            let w = this.data.width
            let h = this.data.height
            let top = this.parent ? this.data.top - this.parent.top : this.data.top
            let left = this.parent ? this.data.left - this.parent.left : this.data.left
            return {
                top: top + 'mm',
                left: left + 'mm',
                width: w + 'mm',
                height: h + 'mm',
                transform: 'rotate(' + this.data.rotateDeg + 'deg)',
                transformOrigin: '0 0',
                zIndex: this.data.zIndex
            }
        },
    },
    methods:{
        openFileUploadDialog(){
            if(!this.isPreview){
                this.$refs.imageInput.click()
            }
        },
        changeURL(e){
            if(e.target.files){
                let file = e.target.files[0]
                if(file){
                    readImageAsDataURL(file, (error, base64URL, imageInfo) => {
                        if(error){
                            alert(error)
                        } else {
                            this.$emit('changeComponentData', {data: {src: base64URL}, shouldUpdate: false})
                        }
                    })
                }
            } else {
                let src = e.target.value
                this.$emit('changeComponentData', {data: {src: src}, shouldUpdate: false})
            }
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