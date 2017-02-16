import Vue from 'vue'
import Router from 'vue-router'
import TemplateList from '../layouts/TemplateList'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'TemplateList',
        component: TemplateList
    }],
    mode: 'history',
})