import Vue from 'vue';
import Vuex from 'vuex'
import {ComparatorResultModule} from "@/store/modules/ComparatorResultModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    comparatorResult: ComparatorResultModule
  }
})