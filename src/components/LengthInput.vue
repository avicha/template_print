<template>
    <div class="el-form-item__content">
        <div class="el-input el-input--small el-input-group el-input-group--append">
            <input ref="lengthInput" type="text" placeholder="" autocomplete="off" class="el-input__inner">
            <div class="el-input-group__append">mm</div>
        </div>
    </div>
</template>
<script>

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
                this.$emit('change', /\d+/.test(value)? value.match(/\d+/)[0] : '')
            } else {
                if(Number(value) > 9999){
                    this.$emit('change', 9999)
                } else {
                    this.$emit('change', Number(value))
                }
            }
        },
    },
    mounted(){
        this.$refs.lengthInput.value = this.length
        this.$refs.lengthInput.addEventListener('keyup', this.inputHandler)
    },
    destroyed(){
        this.$refs.lengthInput.removeEventListener('keyup', this.inputHandler)
    },
}
</script>