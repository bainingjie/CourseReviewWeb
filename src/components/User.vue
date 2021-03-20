<template>
  <div>
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
      userid:''
    };
  },


  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.userid = this.$store.state.user_id;
    },

  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>