<template>
<div class="text-component" :style="componentStyle">
    <span v-html="rawContent"></span>
</div>
</template>

<script>
import Vue from 'vue'
export default {
    data(){
        return {
            ppi: 96
        }
    },
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
                fontWeight: this.data.isBold ? 'bold':'normal',
                fontStyle: this.data.isItalic ? 'italic':'normal',
                textDecoration: this.data.isUnderline ? 'underline':'none',
                fontFamily: this.data.fontFamily,
                fontSize: this.data.fontSize + 'px',
                color: this.data.color,
                top: this.data.top + 'mm',
                left: this.data.left + 'mm',
                transform: 'rotate(' + rotateDeg + 'deg) ' + translate,
                transformOrigin: '0 0',
            }
        },
        rawContent(){
            return this.data.content.replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>')
        }
    },
    watch: {
        data:{
            handler(newData, oldData){
                Vue.nextTick(() => {
                    let w = Math.round(this.$el.clientWidth/this.ppi*2.54*10)
                    let h = Math.round(this.$el.clientHeight/this.ppi*2.54*10)
                    if(w != oldData.width || h != oldData.height){
                        this.$emit('changeComponentData', {width: w, height: h})
                    }
                })
            },
            deep: true
        }
    },
    mounted(){
        let w = Math.round(this.$el.clientWidth/this.ppi*2.54*10)
        let h = Math.round(this.$el.clientHeight/this.ppi*2.54*10)
        this.$emit('changeComponentData', {width: w, height: h})
    }
}
</script>
<style lang="scss">
.text-component {
    padding: 5px;
    &.active {
        border: 1px dashed #4ec0ff;
        background-color: rgba(78, 192, 255, .15);
    }
}
</style>