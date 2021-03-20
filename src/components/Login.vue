<template>
  <div>

    <p v-if="redirected">redirecting....</p>
    <v-text-field v-else v-model="invitation_code" label="招待コードを入力してください"
    append-icon="mdi-send"   @click:append="send_invi_code"
    >  </v-text-field>
    <h6 v-if="!redirected">招待コードはどうやって貰える？</h6>
  </div>
</template>

<script>
import axios from "axios";
import Methods from "../../api/method.js";
// import {credit,point,difficulty,recommendation} from "../../api/GlobalData.js";
export default {
  name: "Login",
  data() {
    return {
      userid:'',
      note:{},
      redirected:false,
      invitation_code:''
    };
  },

  created() {
    this.login();
  },

  methods: {
    async login() {
      if('code' in this.$route.query&& 'state' in this.$route.query){
        console.log('route is complete');
        if (this.$store.state.login_state==this.$route.query.state){
          // todo: check login state
        }
        this.redirected = true;
        var params = new URLSearchParams()
        params.append('grant_type', 'authorization_code')
        params.append('code', this.$route.query.code)
        params.append('redirect_uri', 'https://google.com')
        params.append('client_id', '1655685733')
        params.append('client_secret','bd56354f0e85e712e201068150fda07e')

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        axios.post("https://api.line.me/oauth2/v2.1/token", params, config)
          .then((result) => {
            var params = new URLSearchParams()
            params.append('id_token', result.data.id_token)
            params.append('client_id', '1655685733')

            axios.post("https://api.line.me/oauth2/v2.1/verify",params).then((res)=>{
              this.$store.commit('commit_id', res.data.sub);
            })
          })
          .catch((err) => {
            console.log(err);
          })
      }else{
        console.log('route is not complete');
      }
    },
  async send_invi_code(){
    let invitation = await Methods.postInvitation(this.invitation_code);
    console.log(invitation);
  }
  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>