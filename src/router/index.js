import Vue from 'vue'
import Router from 'vue-router'
import TemplateList from '../layouts/TemplateList'
import TemplateEdit from '../layouts/TemplateEdit'
import OrderList from '../layouts/OrderList'

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
    }, {
        path: '/template/edit',
        name: 'TemplateEdit',
        component: TemplateEdit
    }, {
        path: '/order/list',
        name: 'OrderList',
        component: OrderList
    }],
    mode: 'history',
})