<template>
  <div v-if="error">
    <p>error:先に新規登録してください</p>
    <v-btn href="/register">新規登録する</v-btn>
  </div>
</template>

<script>
import Methods from "../../api/method.js";
export default {
  name: "Login",
  data() {
    return {
      error:false,
    };
  },

  created() {
    this.login();
  },

  methods: {
    async login() {
      if('code' in this.$route.query&& 'state' in this.$route.query){
        this.redirected = true;
        if (this.$store.state.login_state==this.$route.query.state){
          let response = await Methods.LineApiLogin({code:this.$route.query.code});
          if('user_id' in response.data ){
            let response2 = await Methods.checkUser(response.data.user_id);
            // todo: if succeed
            if('exists' in response2.data && response2.data.exists){
              this.$store.commit('commit_id', response.data.user_id);
              console.log('login succeeded,user_id:'+ response.data.user_id);
              this.$router.push('/');
            }else{
              this.error=true;
            }

          }
        }

      }else{
    window.location.href = 'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655685733&redirect_uri='
      +'https%3A%2F%2Fgoogle.com'
      +'&state='+this.$store.state.login_state+'&scope=profile%20openid&nonce=09876xyz';
      }
    }
  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>