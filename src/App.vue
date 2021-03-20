<template>
  <v-app>
    <v-main>
      <v-container>
      <v-app-bar
        absolute
        color="primary"
        dark
      >


            <router-link to="/">
            <v-toolbar-title style = "color:white">
            Cryrin
            </v-toolbar-title>
            </router-link>

             <v-spacer />

             <div v-if="!logged_in">


<!-- https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655685733&redirect_uri=https%3A%2F%2Fgoogle.com&state=12345abcde&scope=profile%20openid&nonce=09876xyz -->

            <v-btn  rounded style="background-color:#2a9d8f;font-weight:600;" dark
            :href="'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655685733&redirect_uri=https%3A%2F%2Focean.mxyr.tech%2F%23%2Flogin&state=12345abcde&scope=profile%20openid&nonce=09876xyz'" class="mx-6" >ログイン</v-btn></div>

             <div v-if="logged_in">
            <v-btn  rounded style="background-color:#2a9d8f;font-weight:600;" dark
            :href="'/#/account'" class="mx-6" >myアカウント</v-btn></div>

      </v-app-bar>
      </v-container>
      <v-container class="mt-10">
      <router-view></router-view>  
      </v-container>
    </v-main>
  </v-app>
  
<!--   <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    logged_in:false,
    user_id:''
  }),
  created() {
    this.logged_in = this.$store.state.logged_in;
    this.user_id = this.$store.state.user_id;
  }
};
</script>
