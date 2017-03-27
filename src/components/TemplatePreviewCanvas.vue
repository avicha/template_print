<template>
<div class="template-preview-canvas-wrapper" :style="canvasWrapperStyle">
    <div class="template-preview-canvas" :style="canvasStyle">
        <component v-for="component in canvas.components" :is="component.type" :isPreview="true" :parent="null" class="component" :data="component.data" :templateData="templateData" :changeComponentData="changeComponentData" :page="page"></component>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import TextComponent from '../components/Text'
import ImageComponent from '../components/Image'
import PropertyComponent from '../components/Property'
import ItemListComponent from '../components/ItemList'
import ContainerComponent from '../components/Container'
import extend from 'lodash/extend'

export default {
    data(){
        return {
            ppi: 96
        }
    },
    props: ['canvas', 'templateData', 'page', 'pageNumber'],
    components: {
        TextComponent,
        ImageComponent,
        PropertyComponent,
        ItemListComponent,
        ContainerComponent,
    },
    computed: {
        canvasWrapperStyle() {
            let w = this.canvas.width/10/2.54*this.ppi
            let h = this.canvas.height/10/2.54*this.ppi
            let maxW = window.innerWidth /2 - 2 * 20
            let maxH = window.innerHeight * 0.6 - 55
            let canvasRate = w/h
            let dialogRate = maxW/maxH
            let paddingTop = 0
            let paddingLeft = 0
            if(canvasRate > dialogRate){
                paddingTop = (maxH - maxW/canvasRate)/2
            } else {
                paddingLeft = (maxW - maxH*canvasRate)/2
            }
            if(canvasRate > dialogRate){
                return {
                    width: maxW + 'px',
                    height: maxW/canvasRate + 'px',
                    paddingTop: paddingTop + 'px',
                    paddingLeft: paddingLeft + 'px'
                }
            } else {
                return {
                    width: maxH * canvasRate + 'px',
                    height: maxH + 'px',
                    paddingTop: paddingTop + 'px',
                    paddingLeft: paddingLeft + 'px'
                }
            }
        },
        canvasStyle() {
            let translate = ''
            let rotateDeg = (this.canvas.rotateDeg + 360)%360
            switch(rotateDeg){
                case 90:
                    translate = ' translateY(-' + this.canvas.height*this.canvas.percentage/100 +'mm)'
                    break;
                case 180:
                    translate = ' translate(-' + this.canvas.width*this.canvas.percentage/100 +'mm, -' + this.canvas.height*this.canvas.percentage/100 + 'mm)'
                    break;
                case 270:
                    translate = ' translateX(-' + this.canvas.width*this.canvas.percentage/100 +'mm)'
                    break;
            }
            let w = this.canvas.width/10/2.54*this.ppi
            let h = this.canvas.height/10/2.54*this.ppi
            let maxW = window.innerWidth /2 - 2 * 20
            let maxH = window.innerHeight * 0.6 - 55
            let canvasRate = w/h
            let dialogRate = maxW/maxH
            let percentage = 1
            if(canvasRate > dialogRate){
                percentage = maxW/w
            } else {
                percentage = maxH/h
            }
            return {
                width: this.canvas.width + 'mm',
                height: this.canvas.height + 'mm',
                backgroundImage: this.canvas.backgroundImage && ('url(' + this.canvas.backgroundImage + ')'),
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                transform: 'rotate(' + rotateDeg + 'deg)' + translate + ' scale(' + percentage + ')',
                transformOrigin: '0 0',
                
            }
        },
    },
    methods:{
        //改变组件的数据
        changeComponentData(component, {data}){
            extend(component.data, data)
        },
    }
}
</script>

<style lang="scss">
.template-preview-canvas-wrapper {
    .template-preview-canvas {
        background-color: #fff;
        box-shadow: 0 0 2px #d6d6d6;
        position: relative;
        overflow: hidden;
        .component {
            position: absolute;
            cursor: default;
            user-select: none;
        }
    }
}
</style>