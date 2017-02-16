import * as types from './mutation_types'
export default {
    [types.RECEIVE_ERROR](state, json) {
        console.error(json.state, json.msg);
        alert(json.msg);
    },
}