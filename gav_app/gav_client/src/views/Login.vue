v-
<template>
  <v-container class="d-flex flex-column align-center mt-16">
    <v-btn
      to="/welcome"
      elevation="5"
      icon
      class="grey darken-3 white--text mb-3"
    >
      <v-icon> mdi-arrow-left </v-icon>
    </v-btn>
    <v-img
      max-height="140"
      max-width="140"
      src="../assets/GAV-logo.svg"
    ></v-img>
    <h1 class="text-center mt-8 mb-16">Willkommen<br />zurück!</h1>
    <div>
      <v-text-field label="E-Mail"></v-text-field>
      <v-text-field label="Passwort"></v-text-field>
    </div>

    <v-btn elevation="5" fab class="align-self-end grey darken-3 white--text">
      <v-icon> mdi-arrow-right </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({}),
};
</script>
