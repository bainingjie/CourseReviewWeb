<template>
  <div>
    <v-card class="my-5 pb-5 mx-5" elevation="10" shaped  >
      <v-card-title style="font-weight: bold;">招待コードをお持ちの方：</v-card-title>
      <v-card-text>
        招待コードを入力すると、Lineでログインする画面に遷移します。<br/>
      </v-card-text>

      <v-text-field v-model="invitation_code" label="招待コードを入力してください"
      append-icon="mdi-send"   @click:append="send_invi_code" class="mx-4"
      >  </v-text-field>
      <h6 class="mx-4" v-if="code_error" style="color:red;">招待コードが間違ってます。もう一度入力してください。</h6>
    </v-card>
    <v-card class="my-10 mx-5 pb-3" elevation="10" shaped>
      <v-card-title style="font-weight: bold;">招待コードをお持ちでない方：</v-card-title>
      <v-card-text>
        下記のいずれかのスクショを公式LINEのアカウントに送信していただいたら、 確認後に招待コードをお送りします。<br/>
        (A) URL(www.cryrin.com)を東大生3人以上にLINEにてシェアいただく（クラスのLINEグループが推奨）<br/>
        (B)公式Twitterをフォローいただき、固定ツイートをリツイートしていただく<br/>
        <br/>
        <span style="font-weight: bold;">なお、AとBがどうしても嫌な方は、その旨を公式Lineに送信していただいたら、 確認後に招待コードをお送りします。</span>
        <br/>
        <br/>
       公式Twitterではおすすめの授業、面白い授業の情報を発信する予定です。<br/>
       公式LINEではご要望やご指摘を承ります。また、皆様にとって有益な情報を煩わしくない頻度で更新する予定です。プロフィールから簡単にサイトに遷移できるの利点もございますので、ぜひご登録ください。<br/>
       <br/>
        <p style="font-weight: bold;">公式Twitter: <a href="https://twitter.com/Cryrin2"> https://twitter.com/Cryrin2 </a></p>

       <p style="font-weight: bold;">公式LINEのQRコード:</p>
         <v-img
          max-height="250"
          max-width="250"
          src="../assets/L.png"
        ></v-img>
        <br/>


      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import Methods from "../../api/method.js";
export default {
  name: "Register",
  data() {
    return {
      userid:'',
      note:{},
      code_error:false,
      invitation_code:'',
    };
  },

  created() {
  },

  methods: {

  async send_invi_code(){
    console.log(this.$store.state.login_state);
    let response = await Methods.checkInvitation({code:this.invitation_code,state:this.$store.state.login_state});
    // console.log(invitation.data);
    if(response.data==null){
      this.code_error=true;
    }else{
      /* :to or router.push use the base url*/
      // console.log(redirect_url);
      this.$store.commit('invited',this.invitation_code);
      window.location.href = response.data.url;
    }
    // 'https%3A%2F%2Focean.mxyr.tech%2F%23%2Flogin'
  }
  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>