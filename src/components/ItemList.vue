<template>
<div class="item-list-component" :style="componentStyle" v-if="!isPreview">
    
</div>
<div class="item-list-component" v-else>
    <PropertyComponent v-for="child in items" class="component" :isPreview="false" :data="child.data" :templateData="templateData"></PropertyComponent>
</div>
</template>

<script>
import PropertyComponent from '../components/Property'
export default {
    props: ['data', 'isPreview', 'templateData', 'page'],
    components:{
        PropertyComponent
    },
    computed: {
        componentStyle(){
            return {
                top: this.data.top + 'mm',
                left: this.data.left + 'mm',
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
                        child.data.sample = item[child.data.propertyCode]
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
    watch: {
        'data.top'(){
            this.$emit('updateItemListId')
        },
        'data.left'(){
            this.$emit('updateItemListId')
        },
        'data.width'(){
            this.$emit('updateItemListId')
        },
        'data.height'(){
            this.$emit('updateItemListId')
        },
    },
}
</script>

<style lang="scss">
.item-list-component {
    background-color: rgba(10, 191, 171, .2);
    &.active {
        border: 1px dashed #4ec0ff;
        margin-left: -1px;
        margin-top: -1px;
        display: block;
    }
}
</style>