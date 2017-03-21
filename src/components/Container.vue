<template>
<div class="container-component" :style="componentStyle">
    
</div>
</template>

<script>
export default {
    props: ['data'],
    computed: {
        componentStyle(){
            return {
                top: this.data.top + 'mm',
                left: this.data.left + 'mm',
                width: this.data.width + 'mm',
                height: this.data.height + 'mm',
                zIndex: this.data.zIndex,
            }
        },
    },
    watch: {
        'data.children': {
            handler(children){
                let tops = [],lefts = [],rights = [], bottoms = []
                children.forEach(component => {
                    tops.push(component.data.top)
                    lefts.push(component.data.left)
                    rights.push(component.data.left + component.data.width)
                    bottoms.push(component.data.top + component.data.height)
                })
                let top = Math.min.apply(this, tops)
                let left = Math.min.apply(this, lefts)
                let right = Math.max.apply(this, rights)
                let bottom = Math.max.apply(this, bottoms)
                this.$emit('changeComponentData', {
                    top: top,
                    left: left,
                    width: right - left,
                    height: bottom - top,
                })
            },
            deep: true
        }
    },
}
</script>

<style lang="scss">
.container-component {
    display: none;
    &.active {
        border: 1px dashed #4ec0ff;
        margin-left: -1px;
        margin-top: -1px;
        display: block;
    }
}
</style>