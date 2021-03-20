import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new  Vuex.Store({
  state: {
    logged_in:true,
    user_id:'1234abcd',
    // todo:  change state to random
    login_state:'state123'
  },
  mutations: {
    commit_id (state,id) {
      state.user_id = id;
    }
  },
  plugins: [createPersistedState({
    key: 'example',
    storage: window.sessionStorage
  })]
});