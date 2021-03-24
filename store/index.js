import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new  Vuex.Store({
  state: {
    logged_in:false,
    user_id:'1234abcd',

    nickname:'',
    // todo:  change state to random
    login_state:'state123',
    invited:false,
    invitation_code:''
  },
  mutations: {
    commit_id (state,id) {
      state.user_id = id;
      state.logged_in = true;
    },
    set_user_info(state,obj){
      state.nickname=obj.nickname;
    },
    logout(state){
      state.user_id='';
      state.logged_in=false;
      state.invited=false;
      state.nickname='';
      state.invitation_code='';
    },
    // before jumping to Line API login page
    invited(state,code){
      state.invited=true;
      state.invitation_code=code;
    }
  },
  plugins: [createPersistedState({
    key: 'example',
    storage: window.sessionStorage
  })]
});