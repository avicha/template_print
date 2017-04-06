<template>
<div style="display: none;">
    <form ref="form" :action="url" method="post" enctype="multipart/form-data" :target="iframeName" >
        <input type="hidden" name="op" value="upload">
        <input ref="imageInput" name="fileContent" type="file" accept="image/*" @change="changeURL">
        <input type="hidden" name="insertOnly" value="0">
    </form>
    <iframe src="javascript:false;" :name="iframeName" @load="iframeLoaded"></iframe>
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
        getParams(){
            if(this.$refs.imageInput.value){
                let region = 'gz'
                let appid = '1252389350'
                let bucket_name = 'jzm'
                let dir_name = '%2FprintTemplate%2F'
                let filename = /[\/\\][^\/\\]*?$/.test(this.$refs.imageInput.value) ? this.$refs.imageInput.value.match(/[\/\\]([^\/\\]*?)$/)[1] : this.$refs.imageInput.value
                filename = Date.now() + '_' + encodeURIComponent(filename)
                let url = '/files/v2/' + appid + '/' + bucket_name + '/' + dir_name + '/' + filename
                return {url, filename}
            } else {
                return {url: '', filename: ''}
            }
        },
        changeURL(e){
            let {url, filename} = this.getParams()
            if(filename){
                getAppSign({filename: filename, postFile: '/printTemplate/'}, (error, sign) => {
                    if(error){
                        alert(error)
                    } else {
                        this.url = url + '?sign=' + sign
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
        this.$on('upload', ()=>{
            this.$refs.imageInput.click()
        })
        this.$on('reset', ()=>{
            this.$refs.imageInput.value = ''
        })
    }
}
</script>