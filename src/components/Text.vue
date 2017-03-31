<template>
<div class="text-component" :style="componentStyle">
    <span v-html="rawContent"></span>
</div>
</template>

<script>
import Vue from 'vue'
import {getOuterWidth, getOuterHeight, getPPI} from '../services/utils'
export default {
    data(){
        return {
            ppi: getPPI()
        }
    },
    props: ['isPreview', 'parent', 'data'],
    computed: {
        componentStyle(){
            let w = this.data.width
            let h = this.data.height
            let top = this.data.top
            let left = this.data.left
            if(this.parent){
                top -= this.parent.top
                left -= this.parent.left
            }
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
            handler(){
                window.setTimeout(() => {
                    this.computeSize()
                }, this.isPreview ? 300 : 0)
            },
            deep: true
        }
    },
    methods:{
        computeSize(){
            let w = Math.round(getOuterWidth(this.$el)/this.ppi*2.54*10)
            let h = Math.round(getOuterHeight(this.$el)/this.ppi*2.54*10)
            if(w != this.data.width && h != this.data.height){
                this.$emit('changeComponentData', {data: {width: w, height: h}, shouldUpdate: false})
            }
        }
    },
    mounted(){
        setTimeout(() => {
            this.computeSize()
        }, 300)
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