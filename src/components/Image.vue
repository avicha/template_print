<template>
<div class="image-component" :style="componentStyle" @dblclick="openFileUploadDialog">
    <img :src="data.src">
    <input ref="imageInput" type="file" class="image-input" @change="changeURL">
</div>
</template>

<script>
import {readImageAsDataURL} from '../services/utils'
export default {
    props: ['data', 'isPreview', 'templateData'],
    computed: {
        componentStyle(){
            let w = this.data.width
            let h = this.data.height
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
                top: this.data.top + 'mm',
                left: this.data.left + 'mm',
                width: this.data.width + 'mm',
                height: this.data.height + 'mm',
                transform: 'rotate(' + rotateDeg + 'deg) ' + translate,
                transformOrigin: '0 0',
            }
        },
    },
    methods:{
        openFileUploadDialog(){
            this.$refs.imageInput.click()
        },
        changeURL(e){
            let file = e.target.files[0]
            if(file){
                readImageAsDataURL(file, (error, base64URL, imageInfo) => {
                    if(error){
                        alert(error)
                    } else {
                        this.$emit('changeComponentData', {src: base64URL})
                    }
                })
            }
        }
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
        background-image: url(~assets/images/image-sample.png);
        background-size: 100% 100%;
    }
    .image-input {
        @include full;
        display: none;
    }
    &.active {
        opacity: .7;
        border: 1px dashed #4ec0ff;
    }
}
</style>