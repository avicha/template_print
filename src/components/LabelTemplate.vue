<template>
    <div class="label">
        <div class="thumbnail-container">
            <img :src="labelTemplate.picURL">
            <em class="default" v-show="labelTemplate.defaultFlag"></em>
            <div class="operation-container">
                <em class="operation-icon"></em>
                <ul class="operation-list">
                    <li class="operation">重命名</li>
                    <li class="operation">复制</li>
                    <li class="operation">设置默认</li>
                    <li class="operation">预览</li>
                    <li class="operation">删除</li>
                </ul>
            </div>
        </div>
        <p class="label-name">{{labelTemplate.labelName}}</p>
    </div>
</template>

<script>
export default {
    name: 'LabelTemplate',
    props: ['labelTemplate']
}
</script>

<style scoped>

</style>
