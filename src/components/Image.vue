<template>
<div class="image-component" :style="componentStyle">
    <img :src="src">
    <div class="resize"></div>
</div>
</template>

<script>

import {getComponentTranslate, transformFileURL} from '../services/utils'
export default {
    data(){
        return {
            isShown: false,
        }
    },
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
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.image-component {
    position: relative;
    img {
        @include full;
    }
    .image-input {
        display: none;
    }
    .resize {
        display: none;
        position: absolute;
        opacity: 0;
        filter: alpha(opacity=0);
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