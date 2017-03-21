<template>
<div class="property-component barcode" :style="componentStyle" v-show="!(isPreview && data.itemListId)" v-if="data.propertyType == 4">
    <img ref="barcode" id="barcode">
</div>
<div class="property-component string" :style="componentStyle" v-show="!(isPreview && data.itemListId)" v-else>
    <span :style="prefixStyle">{{ data.prefix }}</span><span :style="valueStyle">{{ value }}</span><span :style="suffixStyle">{{ data.suffix }}</span>
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import JsBarcode from 'jsbarcode'

export default {
    data(){
        return {
            ppi: 96
        }
    },
    props: ['data', 'isPreview', 'templateData'],
    computed: {
        componentStyle(){
            let w = this.data.width
            let h = this.data.height
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
            let l
            switch(this.data.textAlign){
                case 'left':
                    l = this.data.left
                    break
                case 'center':
                    l = this.data.alignNumber - 0.5 * w
                    break
                case 'right':
                    l = this.data.alignNumber - w
                    break
            }
            if(this.data.propertyType == 4){
                return {
                    top: this.data.top + 'mm',
                    left: l + 'mm',
                    width: w + 'mm',
                    height: h + 'mm',
                    transform: 'rotate(' + rotateDeg + 'deg) ' + translate,
                    transformOrigin: '0 0',
                }    
            }
            return {
                top: this.data.top + 'mm',
                left: l + 'mm',
                transform: 'rotate(' + rotateDeg + 'deg) ' + translate,
                transformOrigin: '0 0',
            }
        },
        prefixStyle(){
            return {
                fontWeight: this.data.prefixStyle.isBold ? 'bold':'normal',
                fontStyle: this.data.prefixStyle.isItalic ? 'italic':'normal',
                textDecoration: this.data.prefixStyle.isUnderline ? 'underline':'none',
                fontFamily: this.data.prefixStyle.fontFamily,
                fontSize: this.data.prefixStyle.fontSize + 'px',
                color: this.data.prefixStyle.color,
            }
        },
        valueStyle(){
            return {
                fontWeight: this.data.valueStyle.isBold ? 'bold':'normal',
                fontStyle: this.data.valueStyle.isItalic ? 'italic':'normal',
                textDecoration: this.data.valueStyle.isUnderline ? 'underline':'none',
                fontFamily: this.data.valueStyle.fontFamily,
                fontSize: this.data.valueStyle.fontSize + 'px',
                color: this.data.valueStyle.color,
            }
        },
        suffixStyle(){
            return {
                fontWeight: this.data.suffixStyle.isBold ? 'bold':'normal',
                fontStyle: this.data.suffixStyle.isItalic ? 'italic':'normal',
                textDecoration: this.data.suffixStyle.isUnderline ? 'underline':'none',
                fontFamily: this.data.suffixStyle.fontFamily,
                fontSize: this.data.suffixStyle.fontSize + 'px',
                color: this.data.suffixStyle.color,
            }
        },
        value(){
            let code = this.data.propertyCode
            let product = this.templateData.productList[0]
            let value = null
            if(this.data.itemListId){
                value = product && product[code]
            } else {
                value = this.templateData[code]    
            }
            if(value == null){
                if(this.data.sample){
                    value = this.data.sample
                } else {
                    return '#{' + code + '}'
                }    
            }
            if(this.data.propertyType == 1 || this.data.propertyType == 3){
                return Number(value).toFixed(this.data.toFixed)    
            } else {
                if(this.data.propertyType == 2){
                    return moment(value).format(this.data.dateFormat)
                } else {
                    return value
                }
            }
        },
    },
    watch: {
        data:{
            handler(newData, oldData){
                Vue.nextTick(() => {
                    let w = Math.round(this.$el.clientWidth/this.ppi*2.54*10)
                    let h = Math.round(this.$el.clientHeight/this.ppi*2.54*10)
                    if(w != oldData.width || h != oldData.height){
                        this.$emit('changeComponentData', {width: w, height: h}, true)
                    }
                })
            },
            deep: true
        },
        'data.sample'(sample){
            if(this.data.propertyType == 4 && sample.length == 13){
                JsBarcode('#barcode', sample, {format: 'ean13', displayValue: false})
            } else {
                this.$refs.barcode.src = ''
            }
        },
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
    mounted(){
        let w = Math.round(this.$el.clientWidth/this.ppi*2.54*10)
        let h = Math.round(this.$el.clientHeight/this.ppi*2.54*10)
        this.$emit('changeComponentData', {width: w, height: h}, true)
        if(this.data.propertyType == 4 && this.data.sample.length == 13){
            JsBarcode('#barcode', this.data.sample, {format: 'ean13', displayValue: false})
        }
    }
}
</script>
<style lang="scss">
.property-component{
    &.string {
        padding: 5px;
        white-space: nowrap;
        span {
            display: inline-block;
            vertical-align: middle;
        }
        &.active {
            border: 1px dashed #4ec0ff;
            background-color: rgba(78, 192, 255, .15);
        }  
    }
    &.barcode {
        img {
            display: block;
            width: 100%;
            height: 100%;
            background-image: url(~assets/images/barcode-sample.png);
        }
        &.active {
            opacity: .7;
            border: 1px dashed #4ec0ff;
        }
    }
}
</style>