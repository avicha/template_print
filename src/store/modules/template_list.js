import * as types from '../mutation_types'
import printAPI from 'api/print'

const state = {
    qualityList: [{
        qualityId: 1,
        picURL: '',
        defaultFlag: 0,
        qualityName: '质保单名称',
        shopName: '深圳市南山区深大1店'
    }, {
        qualityId: 2,
        picURL: '',
        defaultFlag: 1,
        qualityName: '质保单名称',
        shopName: '深圳市南山区深大2店'
    }, {
        qualityId: 3,
        picURL: '',
        defaultFlag: 0,
        qualityName: '质保单名称',
        shopName: '深圳市南山区深大3店'
    }],
    labelList: [{
        labelId: 1,
        labelName: '黄金标签',
        defaultFlag: 0,
        picURL: ''
    }, {
        labelId: 2,
        labelName: 'K金标签',
        defaultFlag: 1,
        picURL: ''
    }]
}
const getters = {}
const actions = {
    get_template_list({
        commit
    }) {
        return printAPI.get_template_list().then(json => {
            if (json.state != 200) {
                commit(types.RECEIVE_ERROR, json)
            }
            return json.data
        })
    }
}
const mutations = {

}
export default {
    state,
    getters,
    actions,
    mutations
}