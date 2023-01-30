
const store = {
    state: {
        'find_condition': {}
    },
    getters: {
        'get_find_condition': state => {
            return state.find_condition
        }
    },
    mutations: {
        'set_find_condition': (state, find_condition) => {
            state.find_condition = find_condition
        }
    },
    actions: {
    }
}
export default store