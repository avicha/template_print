import Vue from 'vue'
import Router from 'vue-router'
import TemplateList from '../layouts/TemplateList'
import TemplateEdit from '../layouts/TemplateEdit'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: TemplateList
    }, {
        path: '/template/list',
        name: 'TemplateList',
        component: TemplateList
}, {    path: '/template/edit',
    name: 'TemplateEdit',
    component: TemplateEdit
}],
    mode: 'history',
})