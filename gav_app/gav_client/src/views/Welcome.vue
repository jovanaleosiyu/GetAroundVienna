<template>
  <v-container class="d-flex flex-column align-center mt-16">
    <!-- <v-img height="140" width="140" src="../assets/GAV-logo.svg"></v-img> -->
    <svg
      class="logo-welcome ma-5"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 500 500"
      xml:space="preserve"
    >
      <path
        d="M500,0C463.7,123.6,280.1,233,0,239.2V500C280.1,471.7,475.4,297,500,0z M342.1,239.8c-58.4,99.6-163.3,148.7-270,161.9
	v-81.4C174.6,317.5,302.5,273.2,342.1,239.8z"
        :fill="'#FFF'"
      />
    </svg>

    <h1 class="text-center mt-8 mb-16">Get Around<br />Vienna</h1>

    <v-btn
      to="/login"
      width="257"
      class="grey darken-4 white--text mx-auto mb-4 rounded-pill"
    >
      Anmelden
    </v-btn>

    <v-btn
      to="/sign-up"
      width="257"
      elevation="4"
      class="white black--text mx-auto mb-4 rounded-pill"
    >
      Registrieren
    </v-btn>

    <v-btn
      @click="guestLogin()"
      text
      class="rounded-pill"
      width="257"
      style="font-size: 13px"
    >
      Ohne Anmeldung fortfahren
    </v-btn>
  </v-container>
</template>

<script>
import { bus } from '../main';
import VueCookies from 'vue-cookies';
export default {
  name: 'Welcome',
  data: () => ({}),
  methods: {
    guestLogin() {
      bus.$emit('loggedIn', true);
      VueCookies.set('loggedIn', true);
      this.$router.push({ name: 'Route' });
    },
  },
};
</script>

<style>
.logo-welcome {
  max-width: 140px;
  max-height: 140px;
}
</style>
