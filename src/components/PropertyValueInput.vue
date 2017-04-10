<template>
    <div class="el-form-item__content">
        <div class="property-value-input el-input el-input--small el-input-group el-input-group--append">
            <input ref="propertyValueInput" type="text" placeholder="" autocomplete="off" class="el-input__inner">
            <div class="el-input-group__append">
                <i class="icon font-style-icon" :class="{active: currentStyleType == styleType}" @click="iconClickHandler"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'styleType', 'currentStyleType'],
    watch:{
        value(){
            this.$refs.propertyValueInput.value = this.value
        }
    },
    methods:{
        inputHandler(e){
            let value = e.target.value
            this.$emit('change', value)
        },
        iconClickHandler(){
            this.$emit('changeStyleType', this.styleType)
        }
    },
    mounted(){
        this.$refs.propertyValueInput.value = this.value
        this.$refs.propertyValueInput.addEventListener('keyup', this.inputHandler)
    },
    destroyed(){
        this.$refs.propertyValueInput.removeEventListener('keyup', this.inputHandler)
    },
}
</script>