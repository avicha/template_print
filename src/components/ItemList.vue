<template>
<div class="item-list-component" :style="componentStyle" v-if="!isPreview">
    <div class="resize"></div>
</div>
<div class="item-list-component" v-else>
    <PropertyComponent v-for="child in items" class="component" :isPreview="false" :data="child.data" :templateData="templateData"></PropertyComponent>
    <div class="resize"></div>
</div>
</template>

<script>
import PropertyComponent from '../components/Property'
export default {
    props: ['isPreview', 'parent', 'data', 'templateData', 'page'],
    components:{
        PropertyComponent
    },
    computed: {
        componentStyle(){
            let top = this.parent ? this.data.top - this.parent.top : this.data.top
            let left = this.parent ? this.data.left - this.parent.left : this.data.left
            return {
                top: top + 'mm',
                left: left + 'mm',
                width: this.data.width + 'mm',
                height: this.data.height + 'mm',
            }
        },
        items(){
            let items = []
            let top = this.data.top
            let h = this.data.height
            let number = this.data.number
            let productList = this.templateData.productList.slice((this.page -1) * number, this.page * number)
            number = Math.min(number, productList.length)
            if(number){
                let gap = h/(number+1)
                productList.forEach((item, i) => {
                    let children = JSON.parse(JSON.stringify(this.data.children))
                    children.forEach(child => {
                        child.data.top = top + (i+1) * gap - 0.5 * child.data.height
                    })
                    items = items.concat(children)
                })    
            } else {
                this.data.children.forEach(child => {
                    let childClone = JSON.parse(JSON.stringify(child))
                    childClone.data.top = top + 0.5 * h - 0.5 * childClone.data.height
                    items.push(childClone)
                })
            }
            return items
        }
    },
}
</script>

<style lang="scss">
.item-list-component {
    background-color: rgba(10, 191, 171, .2);
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
        border: 1px dashed #4ec0ff;
        margin-left: -1px;
        margin-top: -1px;
        display: block;
        .resize {
            display: block;
        }
    }
}
</style>