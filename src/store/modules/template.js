import * as types from '../mutation_types'
import printAPI from 'api/print'
import extend from 'lodash/extend'
import find from 'lodash/find'

const state = {
    qualityList: [],
    labelList: [],
    propList: [],
    shopList: [],
    templateSizeList: [],
    detail: {
        templateId: null,
        name: '',
        content: JSON.stringify({
            percentage: 100,
            width: 0,
            height: 0,
            backgroundImage: '',
            rotateDeg: 0,
            components: [

            ],
        }),
        shopName: '',
        shopId: null,
        width: 0,
        height: 0,
    }
}
const getters = {}
const actions = {
    getTemplateList({
        commit
    }) {
        return printAPI.getTemplateList().then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            } else {
                commit(types.RECEIVE_QUALITY_LIST, json.data.qualityList)
                commit(types.RECEIVE_LABEL_LIST, json.data.labelList)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    previewTemplate({
        commit
    }, templateId) {
        return printAPI.previewTemplate(templateId).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            } else {
                commit(types.RECEIVE_TEMPLATE_DETAIL, json.data)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    getPrintShopData({
        commit
    }, type) {
        return printAPI.getPrintShopData(type).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            } else {
                commit(types.RECEIVE_SHOP_LIST, json.data.shopList)
                commit(types.RECEIVE_TEMPLATE_SIZE_LIST, json.data.commonList)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    updateTemplate({
        commit
    }, templateData) {
        return printAPI.updateTemplate(templateData).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    createTemplate({
        commit
    }, templateData) {
        return printAPI.createTemplate(templateData).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    setDefaultTemplate({
        commit
    }, templateId) {
        return printAPI.setDefaultTemplate(templateId).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    deleteTemplate({
        commit
    }, templateId) {
        return printAPI.deleteTemplate(templateId).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    getPrintMenuData({
        commit
    }, type) {
        return printAPI.getPrintMenuData(type).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            } else {
                commit(types.RECEIVE_PRODUCT_PROP_LIST, json.data)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    getPrintQualityData({
        commit
    }, filter) {
        return printAPI.getPrintQualityData(filter).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    },
    getPrintLabelData({
        commit
    }, filter) {
        return printAPI.getPrintLabelData(filter).then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            }
            return json
        }).catch(e => {
            commit(types.RECEIVE_ERROR, {
                msg: e.message
            })
        })
    }
}
const mutations = {
    [types.RECEIVE_QUALITY_LIST](state, qualityList) {
        state.qualityList = qualityList
    },
    [types.RECEIVE_LABEL_LIST](state, labelList) {
        state.labelList = labelList
    },
    [types.QUALITY_TEMPLATE_LIST_UPDATED](state, templateData) {
        let filter = {
            templateId: templateData.templateId
        }
        let template = find(state.qualityList, filter)
        if (template) {
            extend(template, templateData)
        }
    },
    [types.LABEL_TEMPLATE_LIST_UPDATED](state, templateData) {
        let filter = {
            templateId: templateData.templateId
        }
        let template = find(state.labelList, filter)
        if (template) {
            extend(template, templateData)
        }
    },
    [types.QUALITY_TEMPLATE_LIST_APPEND](state, templateData) {

        state.qualityList.splice(0, 0, templateData)
    },
    [types.LABEL_TEMPLATE_LIST_APPEND](state, templateData) {
        state.labelList.splice(0, 0, templateData)
    },
    [types.QUALITY_TEMPLATE_LIST_REMOVE](state, templateId) {
        state.qualityList = state.qualityList.filter(template => template.templateId != templateId)
    },
    [types.LABEL_TEMPLATE_LIST_REMOVE](state, templateId) {
        state.labelList = state.labelList.filter(template => template.templateId != templateId)
    },
    [types.RECEIVE_SHOP_LIST](state, shopList) {
        state.shopList = shopList
    },
    [types.RECEIVE_TEMPLATE_SIZE_LIST](state, templateSizeList) {
        state.templateSizeList = templateSizeList
    },
    [types.RECEIVE_PRODUCT_PROP_LIST](state, json) {
        state.propList = json.menuList
    },
    [types.RECEIVE_TEMPLATE_DETAIL](state, template) {
        state.detail = template
    },
    [types.TEMPLATE_DETAIL_UPDATED](state, template) {
        extend(state.detail, template)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}