<template>
    <div class="quality">
        <div class="thumbnail-container">
            <img :src="qualityTemplate.picURL">
            <em class="default" v-show="qualityTemplate.defaultFlag"></em>
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
        <p class="quality-name">{{qualityTemplate.qualityName}}</p>
        <p class="shop-name">{{qualityTemplate.shopName}}</p>
    </div>
</template>

<script>
export default {
    name: 'QualityTemplate',
    props: ['qualityTemplate']
}
</script>

<style scoped>

</style>
