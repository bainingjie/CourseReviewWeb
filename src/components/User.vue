<template>
  <div>
  <v-btn v-on:click="logout">logout</v-btn>
   <p>userid:{{userid}}</p>
   <p>プロフィール</p>
   <p>ブックマーク</p>
   <p>書いたレビュー</p>
   <p>購入履歴</p>
   <p>売出し中</p>

  </div>
</template>

<script>
// import Methods from "../../api/method.js";
// import {credit,point,difficulty,recommendation} from "../../api/GlobalData.js";
export default {
  name: "User",
  data() {
    return {
      userid: this.$store.state.user_id
    };
  },



  methods: {
    logout(){
      this.$store.commit('logout');
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>