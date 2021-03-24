<template>


  <v-app>

      <v-app-bar
        app
        color="primary"
        dark
      >


            <router-link to="/">
            <v-toolbar-title style = "color:white">
            Cryrin
            </v-toolbar-title>
            </router-link>

             <v-spacer />

             <div v-if="!$store.state.logged_in">

<!-- https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655685733&redirect_uri=https%3A%2F%2Fgoogle.com&state=12345abcde&scope=profile%20openid&nonce=09876xyz -->

            <v-btn  rounded style="background-color:#2a9d8f;font-weight:600;" dark
            href= "/register" class="mx-6" >新規登録</v-btn>
            <v-btn  rounded style="background-color:#2a9d8f;font-weight:600;" dark
            :href= "'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655685733&redirect_uri='
              +'https%3A%2F%2Fwww.cryrin.com%2Fredirect'
              +'&state='+this.$store.state.login_state+'&scope=profile%20openid&nonce=09876xyz'" 
            class="mx-6" >ログイン</v-btn>
          </div>

          <div v-if="$store.state.logged_in">
<!--             <v-btn  rounded style="background-color:#2a9d8f;font-weight:600;" dark
            :href="'/#/account'" class="mx-6" >ようこそ、{{$store.state.nickname}}</v-btn> -->
            <v-btn  rounded style="background-color:#2a9d8f;font-weight:600;" dark
             class="mx-6" v-on:click="logout">logout</v-btn>
          </div>

      </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
<!-- 
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">
      </v-container>
    </v-sheet>
  </v-card> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({

  }),
  methods: {
    logout(){
      this.$store.commit('logout');
      // this.$router.push('/');
    }
  },
};
</script>
