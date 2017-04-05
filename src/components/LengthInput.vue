<template>
    <div class="el-form-item__content">
        <div class="el-input el-input--small el-input-group el-input-group--append">
            <input ref="lengthInput" type="text" placeholder="" autocomplete="off" class="el-input__inner" @blur="blurHandler" @input="inputHandler">
            <div class="el-input-group__append">mm</div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props: ['length'],
    watch:{
        length(){
            this.$refs.lengthInput.value = this.length
        }
    },
    methods:{
        inputHandler(e){
            let value = e.target.value
            if(value && !/^\d+$/.test(value)){
                value = /\d+/.test(value)? Number(value.match(/\d+/)[0]) : ''
            } else {
                if(value){
                    value = Number(value)
                    if(value > 9999){
                        value = 9999
                    }
                }
            }
            this.$refs.lengthInput.value = value
            this.$emit('change', value)
        },
        blurHandler(e){
            let value = e.target.value
            if(!value){
                value = 0
                this.$refs.lengthInput.value = value
                this.$emit('change', value)
            }
        }
    },
    mounted(){
        this.$refs.lengthInput.value = this.length
    },
}
</script>