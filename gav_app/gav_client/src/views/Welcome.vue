<template>
  <v-container class="d-flex flex-column align-center mt-16">

    <v-img
      max-height="140"
      max-width="140"
      src="../assets/GAV-logo.svg"
    ></v-img>

    <h1 class="text-center mt-8 mb-16">Get Around<br />Vienna</h1>

    <v-btn to="/login" width="257" class="grey darken-4 white--text mx-auto mb-4 rounded-pill">
      Anmelden
    </v-btn>

    <v-btn to="/sign-up" width="257" elevation="4" class="white white--black mx-auto mb-4 rounded-pill">
      Registrieren
    </v-btn>

    <v-btn @click="guestLogin()" text class="black--text rounded-pill" width="257" style="font-size: 13px;">
      Ohne Anmeldung fortfahren
    </v-btn>

  </v-container>
</template>

<script>
import { bus } from '../main';
export default {
  name: "Welcome",
  data: () => ({}),
  methods: {
    guestLogin() {
      bus.$emit('loggedIn', true);
      this.$router.push({ name: 'Home' });
    }
  },
};
</script>

<style scoped></style>
