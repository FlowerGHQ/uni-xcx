import Vue from 'vue'
import Vuex, { GetterTree, MutationTree, Store, ActionTree } from 'vuex'
import competition from './modules/competition'
import account from './modules/account'
import org from './modules/org'

Vue.use(Vuex)

export interface RootState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export default new Store({
  state: {},
  actions: {},
  modules: {
    competition,
    account,
    org
  }
})
