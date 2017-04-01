<template>
<div class="item-list-component" :style="componentStyle" v-if="!isPreview">
    <div class="resize"></div>
</div>
<div class="item-list-component" v-else>
    <PropertyComponent v-for="child in items" class="component" :isPreview="true" :data="child.data" :templateData="templateData" @changeComponentData="changeComponentData(child, $event)"></PropertyComponent>
</div>
</template>

<script>
import PropertyComponent from '../components/Property'
export default {
    props: ['isPreview', 'parent', 'data', 'templateData', 'page', 'changeComponentData'],
    components:{
        PropertyComponent
    },
    data(){
        return {
            children: [],
        }
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
                zIndex: this.data.zIndex
            }
        },
        items(){
            this.children = []
            let top = this.data.top
            let h = this.data.height
            let number = this.data.number
            let productList = this.templateData.productList.slice((this.page -1) * number, this.page * number)
            number = Math.min(number, productList.length)
            if(number){
                let gap = h/(number+1)
                productList.forEach((item, i) => {
                    let items = JSON.parse(JSON.stringify(this.data.children))
                    items.forEach(child => {
                        child.data.productIndex = (this.page -1) * number + i
                        child.data.top = top + (i+1) * gap - 0.5 * child.data.height
                    })
                    this.children = this.children.concat(items)
                })    
            } else {
                this.data.children.forEach(child => {
                    let childClone = JSON.parse(JSON.stringify(child))
                    childClone.data.productIndex = 0
                    childClone.data.top = top + 0.5 * h - 0.5 * childClone.data.height
                    this.children.push(childClone)
                })
            }
            return this.children
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
        width: 20px;
        height: 20px;
        top: 100%;
        left: 100%;
        margin-left: -12px;
        margin-top: -12px;
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