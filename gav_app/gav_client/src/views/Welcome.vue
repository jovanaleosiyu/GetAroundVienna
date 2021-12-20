<template>
  <v-container class="d-flex flex-column align-center mt-16">

    <v-img
      max-height="140"
      max-width="140"
      src="../assets/GAV-logo.svg"
    ></v-img>

    <h1 class="text-center mt-8 mb-16">Get Around<br />Vienna</h1>

    <v-btn to="/login"  width="257" class="grey darken-4 white--text mx-auto mb-4 rounded-pill">
      Anmelden
    </v-btn>

    <v-btn to="/sign-up" width="257" elevation="4" class="white white--black mx-auto mb-4 rounded-pill">
      Registrieren
    </v-btn>

    <router-link to="/home" class="black--text" style="text-decoration: none">
      Ohne Anmeldung fortfahren
    </router-link>

  </v-container>
</template>

<script>
export default {
  name: "Welcome",
  data: () => ({}),
};
</script>

<style scoped></style>
