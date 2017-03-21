<template>
<div class="image-component" :style="componentStyle">
    <img :src="data.src">
</div>
</template>

<script>
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
}
</script>

<style lang="scss">
.image-component {
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    &.active {
        opacity: .7;
        border: 1px dashed #4ec0ff;
    }
}
</style>