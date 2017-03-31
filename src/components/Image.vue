<template>
<div class="image-component" :style="componentStyle" @dblclick="openFileUploadDialog">
    <img :src="data.src">
    <input ref="imageInput" type="file" class="image-input" accept="image/jpeg,image/jpg,image/png,image/gif;" @change="changeURL">
    <div class="resize"></div>
</div>
</template>

<script>
import {readImageAsDataURL} from '../services/utils'
export default {
    props: ['data', 'parent', 'templateData'],
    computed: {
        componentStyle(){
            let w = this.data.width
            let h = this.data.height
            let top = this.parent ? this.data.top - this.parent.top : this.data.top
            let left = this.parent ? this.data.left - this.parent.left : this.data.left
            let rotateDeg = (this.data.rotateDeg + 360)%360
            let translate = ''
            switch(rotateDeg){
                case 90:
                    translate = 'translateY(-' + h +'mm)'
                    break;
                case 180:
                    translate = 'translate(-' + w +'mm, -' + h + 'mm)'
                    break;
                case 270:
                    translate = 'translateX(-' + w +'mm)'
                    break;
                default:
                    translate = 'translate(0, 0)'
            }
            return {
                top: top + 'mm',
                left: left + 'mm',
                width: w + 'mm',
                height: h + 'mm',
                transform: 'rotate(' + rotateDeg + 'deg) ' + translate,
                transformOrigin: '0 0',
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
        },
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.image-component {
    position: relative;
    img {
        display: block;
        width: 100%;
        height: 100%;
        outline: none;
        background-image: url(~assets/images/image-sample.png);
        background-size: 100% 100%;
    }
    .image-input {
        @include full;
        display: none;
    }
    .resize {
        display: none;
        position: absolute;
        opacity: 0;
        width: 10px;
        height: 10px;
        top: 100%;
        left: 100%;
        margin-left: -5px;
        margin-top: -5px;
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