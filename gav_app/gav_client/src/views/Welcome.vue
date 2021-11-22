v-
<template>
  <div class="d-flex flex-column mt-16">
    <v-img
      max-height="140"
      max-width="140"
      src="../assets/GAV-logo.svg"
      class="mx-auto"
    ></v-img>
    <h1 class="text-center mt-8 mb-16">Get Around<br />Vienna</h1>
    <v-btn to="/login" class="grey darken-4 white--text mx-auto mb-4"
      >Anmelden</v-btn
    >

    <v-btn to="/sign-up" class="grey darken-4 white--text mx-auto mb-4"
      >Registrieren</v-btn
    >

    <router-link class="text-center mx-auto" to="#"
      >Ohne Anmeldung fortfahren</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data: () => ({}),
};
</script>

<style scoped></style>
