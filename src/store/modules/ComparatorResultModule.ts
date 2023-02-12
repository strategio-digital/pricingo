import {ActionContext} from "vuex";
import {ComparatorResult} from "../../../functions/src/types/ComparatorResult";

type State = { results: Array<ComparatorResult> }

export const ComparatorResultModule = {
    namespaced: true,
    state: {
        results: require('@/assets/table-result.json')
    },
    mutations: {
        save(state: State, data: Array<ComparatorResult>) {
            state.results.splice(0, state.results.length);
            state.results.push(... data);
        }
    },
    actions: {
        save(context: ActionContext<State,State>, data: Array<ComparatorResult>) {
            context.commit('save', data);
        }
    },
    getters: {
        getResults: (state: State) => state.results
    },
}