<template>
    <div class="template-list-page">
        <div>
            <button class="create-template-btn"></button>
        </div>
        <div class="template-list-container">
            <p class="quality-list-text">质保单</p>
            <div class="quality-list">
                <QualityTemplate v-for="qualityTemplate in qualityList" :qualityTemplate="qualityTemplate" :key="qualityTemplate.qualityId"></QualityTemplate>
            </div>
            <p class="label-list-text">标签</p>
            <div class="label-list">
                <LabelTemplate v-for="labelTemplate in labelList" :labelTemplate="labelTemplate" :key="labelTemplate.labelId"></LabelTemplate>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import QualityTemplate from 'components/QualityTemplate'
import LabelTemplate from 'components/LabelTemplate'
export default {
    name: 'TemplateList',
    computed: {...mapState({
            qualityList: state => state.templateList.qualityList,
            labelList: state => state.templateList.labelList
        })
    },
    components:{
        QualityTemplate,
        LabelTemplate
    }
}
</script>


<style scoped>

</style>
