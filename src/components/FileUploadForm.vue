<template>
<div class="file-upload-form-container">
    <form ref="form" :action="url" method="post" enctype="multipart/form-data" :target="iframeName" >
        <input type="hidden" name="op" value="upload">
        <input ref="imageInput" size="0" name="fileContent" type="file" accept="image/gif,image/jpeg,image/png" @change="changeURL">
        <input type="hidden" name="insertOnly" value="0">
    </form>
    <iframe ref="iframe" src="javascript:false;" :name="iframeName"></iframe>
</div>
</template>

<script>
import Vue from 'vue'
import {getAppSign} from '../services/utils'
export default {
    data(){
        return {
            iframeName: '_AjaxFileUpload' + window.parseInt(1000000000*Math.random()),
            url: '',
        }
    },
    methods:{
        getFilename(){
            if(this.$refs.imageInput.value){
                let filename = /[\/\\][^\/\\]*?$/.test(this.$refs.imageInput.value) ? this.$refs.imageInput.value.match(/[\/\\]([^\/\\]*?)$/)[1] : this.$refs.imageInput.value
                return filename
            } else {
                return ''
            }
        },
        changeURL(e){
            let filename = this.getFilename()
            if(filename){
                getAppSign({type: 3}, (error, {sign, dir_name}) => {
                    if(error){
                        alert(error)
                    } else {
                        let region = 'gz'
                        let appid = '1252389350'
                        let bucket_name = 'jzm'
                        dir_name = encodeURIComponent(dir_name)
                        filename = Date.now() + '_' + filename
                        this.url = '/files/v2/' + appid + '/' + bucket_name + '/' + dir_name + '/' + encodeURIComponent(filename) + '?sign=' + encodeURIComponent(sign)
                        Vue.nextTick(() => {
                            this.$refs.form.submit()    
                        })
                    }
                })
            }
        },
        iframeLoaded(e){
            let iframe  = e.target
            let doc = (iframe.contentWindow && iframe.contentWindow.document)  || iframe.contentDocument.document
            let json = doc.body.innerHTML
            console.log(json)
            if (json && /{.*}/.test(json)) {
                json = JSON.parse(json.match(/{.*}/)[0])
                if(json.code){
                    this.$emit('uploadFail', json.message)
                } else {
                    this.$emit('uploadSuccess', json.data)    
                }
            } else {
                json = {}
            }
        }
    },
    mounted(){
        this.$on('reset', ()=>{
            this.$refs.imageInput.value = ''
        })
        if(/IE/.test(window.navigator.userAgent)){
            this.$refs.iframe.onreadystatechange = e => {
                if(e.target.readyState == 'complete' || e.target.readyState == 'interactive'){
                    this.iframeLoaded(e)
                }
            }
        } else {
            this.$refs.iframe.onload = this.iframeLoaded
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.file-upload-form-container {
    z-index: 100;
    form {
        @include full;
        overflow: hidden;
        input[type="file"] {
            font-size: 100px;
            @include full;
            opacity: 0;
            filter: alpha(opacity=0);
        }
    }
    
    iframe {
        display: none;
    }
}
</style>