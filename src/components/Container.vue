<template>
<div class="container-component" :style="componentStyle">
    <component v-for="component in components" :is="component.type" :isPreview="isPreview" :parent="data" class="component" :class="{active: component.active}" :data="component.data" :templateData="templateData" :page="page" @changeComponentData="changeComponentData(component, $event)" :changeComponentData="changeComponentData">
    </component>
</div>
</template>

<script>
import TextComponent from '../components/Text'
import ImageComponent from '../components/Image'
import PropertyComponent from '../components/Property'
import ItemListComponent from '../components/ItemList'
import {getComponentBound, getComponentTranslate} from '../services/utils'

export default {
    props: ['isPreview', 'data', 'templateData', 'page', 'changeComponentData'],
    computed: {
        components(){
            //预览时，不渲染商品列表的属性值，由商品列表自己渲染
            if(!this.isPreview){
                return this.data.children
            } else {
                return this.data.children.filter(child => !(child.type == 'PropertyComponent' && child.data.itemListId))
            }
        },
        //渲染容器的样式，根据子组件的边界来确定容器的位置和大小，不一致则调整过来
        componentStyle(){
            let tops = [],lefts = [],rights = [], bottoms = []
            this.data.children.forEach(component => {
                let {left, top, right, bottom} = getComponentBound(component.data, this.data)
                tops.push(top)
                lefts.push(left)
                rights.push(right)
                bottoms.push(bottom)
            })
            let top = Math.min.apply(this, tops)
            let left = Math.min.apply(this, lefts)
            let right = Math.max.apply(this, rights)
            let bottom = Math.max.apply(this, bottoms)
            let width = right - left
            let height = bottom - top
            if(top != this.data.top || left != this.data.left || width != this.data.width || height != this.data.height){
                this.$emit('changeComponentData', {data: {top, left, width, height}, shouldUpdate: false})    
            }
            return {
                top: top + 'mm',
                left: left + 'mm',
                width: width + 'mm',
                height: height + 'mm',
                transform: 'rotate(' + this.data.rotateDeg + 'deg) ' + getComponentTranslate(this.data),
                transformOrigin: '0 0',
                zIndex: this.data.zIndex
            }
        },
    },
    components: {
        TextComponent,
        ImageComponent,
        PropertyComponent,
        ItemListComponent,
    },
}
</script>

<style lang="scss">
.container-component {
    &.active {
        border: 1px dashed #4ec0ff;
        margin-left: -1px;
        margin-top: -1px;
        display: block;
    }
}
</style>