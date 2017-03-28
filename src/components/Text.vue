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
    props: ['isPreview', 'parent', 'data'],
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
                fontWeight: this.data.isBold ? 'bold':'normal',
                fontStyle: this.data.isItalic ? 'italic':'normal',
                textDecoration: this.data.isUnderline ? 'underline':'none',
                fontFamily: this.data.fontFamily,
                fontSize: this.data.fontSize + 'px',
                color: this.data.color,
                top: top + 'mm',
                left: left + 'mm',
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
                if(!this.isPreview){
                    Vue.nextTick(() => {
                        let w = Math.round(this.$el.clientWidth/this.ppi*2.54*10)
                        let h = Math.round(this.$el.clientHeight/this.ppi*2.54*10)
                        if(w != oldData.width || h != oldData.height){
                            this.$emit('changeComponentData', {data: {width: w, height: h}, shouldUpdate: false})
                        }
                    })
                }
            },
            deep: true
        }
    },
    mounted(){
        if(!this.isPreview){
            let w = Math.round(this.$el.clientWidth/this.ppi*2.54*10)
            let h = Math.round(this.$el.clientHeight/this.ppi*2.54*10)
            this.$emit('changeComponentData', {data: {width: w, height: h}, shouldUpdate: false})    
        }
    }
}
</script>
<style lang="scss">
.text-component {
    padding: 5px;
    white-space: nowrap;
    &.active {
        border: 1px dashed #4ec0ff;
        padding: 4px;
        background-color: rgba(78, 192, 255, .15);
    }
    span {
        line-height: 1;
    }
}
</style>