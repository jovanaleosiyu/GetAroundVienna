<template>
  <v-container class="d-flex flex-column align-center mt-16">
    <v-card class="d-flex flex-column align-center" :outlined=true :min-width="$vuetify.breakpoint.mdAndUp ? 450 :'100%'" style="border: none">

      <div class="d-flex justify-start" style="width: 100%">

        <v-btn
          to="/"
          icon
          class="my-auto"
          >
          <v-icon class="black--text" large> mdi-chevron-left </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-img
          max-height="46"
          max-width="46"
          src="../assets/GAV-logo.svg"
          class="mr-9"
        ></v-img>

        <v-spacer></v-spacer>
      </div>

      <h1 class="text-center mt-8 mb-16">Willkommen<br />zurück!</h1>

      <v-form class="d-flex flex-column align-center" v-model="valid" style="width: 100%">
        <div style="width: 80%">
        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-Mail"
        required
        ></v-text-field>

        <v-text-field
        v-model="password"
        :rules="passwordRules"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        label="Passwort"
        required
        ></v-text-field>
        </div>

        <h2>{{ errorMessage }}</h2>

        <v-btn elevation="5" @click="login()" :disabled="!valid" fab class="align-self-end grey darken-3 white--text mt-16">
        <v-icon> mdi-arrow-right </v-icon>
      </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { bus } from "../main";
import VueCookies from 'vue-cookies';
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
        v => !!v || 'E-mail ist erforderlich',
        v => /.+@.+\..+/.test(v) || 'E-mail muss passend sein',
      ],
    password: '',
    passwordRules: [v => !!v || "Passwort ist erforderlich"],
    show: false,
    errorMessage: ''
  }),
  methods: {
    async login() {
      var loginData = {
        email: this.email,
        password: this.password
      }
      await axios.post("http://localhost:3000/login",loginData).then(response => {
        bus.$data.userId = response.data;
        VueCookies.set('userId', response.data);
        this.$router.push({ name: 'Home' })
      }).catch(error =>{
        if(error.response.status != 200){
          this.errorMessage = "E-Mail oder Passwort ist falsch!"
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
