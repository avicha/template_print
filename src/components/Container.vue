<template>
<div class="container-component" :style="componentStyle">
    <component v-for="component in data.children" :is="component.type" :isPreview="isPreview" :parent="data" class="component" :class="{active: component.active}" :data="component.data" :templateData="templateData" @changeComponentData="changeComponentData(component, $event)">
    </component>
</div>
</template>

<script>
import TextComponent from '../components/Text'
import ImageComponent from '../components/Image'
import PropertyComponent from '../components/Property'
import ItemListComponent from '../components/ItemList'
export default {
    props: ['isPreview', 'data', 'templateData', 'changeComponentData'],
    computed: {
        componentStyle(){
            let tops = [],lefts = [],rights = [], bottoms = []
            this.data.children.forEach(component => {
                tops.push(component.data.top)
                lefts.push(component.data.left)
                rights.push(component.data.left + component.data.width)
                bottoms.push(component.data.top + component.data.height)
            })
            let top = Math.min.apply(this, tops)
            let left = Math.min.apply(this, lefts)
            let right = Math.max.apply(this, rights)
            let bottom = Math.max.apply(this, bottoms)
            let w = right - left
            let h = bottom - top
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
            this.$emit('changeComponentData', {data: {top, left, width: w, height: h}, shouldUpdate: false})
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