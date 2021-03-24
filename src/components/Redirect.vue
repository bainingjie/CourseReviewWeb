<template>
  <v-container>
    <div v-show="register">
      <v-text-field v-model="name" label="ニックネーム"></v-text-field>
      <v-text-field v-model="university" label="大学"></v-text-field>
      <v-text-field v-model="department" label="学部"></v-text-field>
      <v-select v-model="subdepartment" label="科類" :items="items"></v-select>
      <v-select v-model="enrollment_year" label="入学年度" :items="years"></v-select>
      <v-text-field v-model="email" label="メールアドレス"></v-text-field>
      <v-btn v-on:click="submit" class="primary">登録</v-btn>
    </div>
    <div v-show="error">
      <p>error: {{error_message}}</p>
    </div>
  </v-container>
</template>

<script>
import Methods from "../../api/method.js";
export default {
  name: "Redirect",
  data() {
    return {
      error:false,
      error_message:'',
      register:false,
      items:['理科一類','文科一類','理科二類','文科二類','理科三類','文科三類'],
      years:[2021,2020,2019,2018],

      user_id:'',
      name:'',
      university:'東京大学',
      department:'教養学部（前期）',
      subdepartment:'',
      enrollment_year:2021,
      email:'',
    };
  },

  created() {
    this.login();
  },

  methods: {
    async login() {
      if('code' in this.$route.query&& 'state' in this.$route.query){
        if (this.$store.state.login_state==this.$route.query.state){
          let response = await Methods.LineApiLogin({code:this.$route.query.code});
          console.log(response.data);
          if('user_id' in response.data ){
            let response2 = await Methods.checkUser(response.data.user_id);
            // todo: if succeed
            console.log(response2.data);
            if('exists' in response2.data){
                /*login*/
                if(response2.data.exists){
                  this.$store.commit('commit_id', response.data.user_id);
                  this.$store.commit('set_user_info', {nickname:response2.data.nickname});                  
                  console.log('login succeeded,nickname:'+ response2.data.nickname);
                  this.$router.push('/');
                /*register*/
                }else{
                  if(this.$store.state.invited){
                    Methods.disableInvCode({code:this.$store.state.invitation_code});
                    this.register=true;
                    this.user_id = response.data.user_id;        
                  }else{
                    this.error=true;
                    this.error_message ='先に新規登録してください';
                  }
                }
            }else{
              this.error=true;
              this.error_message='check User failed';
            }

          }else{
              this.error=true;
              this.error_message='login by Line failed'; 
          }
        }

      }else{
        // this.$router.push('/');
      }
    },
    async submit(){
      // submit & create user

      let obj = {
        user:this.user_id,
        name:this.name,
        university:this.university,
        department:this.department,
        subdepartment:this.subdepartment,
        enrollment_year:this.enrollment_year,
        email:this.email
      }
      let response = await Methods.createUser(obj);
      if(response.status=== 200){
          this.$store.commit('commit_id', this.user_id);
          this.$store.commit('set_user_info', {nickname:this.nickname});
          console.log('login succeeded,user_id:'+ this.user_id);
          this.$router.push('/');
      }else{
        this.error=true;
        this.error_message='failed to create User';
      }
    }
  },
};
</script>

<style scoped>
/*.v-select{
  font-size: 13px;
}*/

</style>