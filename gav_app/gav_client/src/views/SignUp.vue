v-<template>
    <v-container class="d-flex flex-column align-center mt-16">
      <v-card class="d-flex flex-column align-center" :min-width="$vuetify.breakpoint.mdAndUp ? 450 :'100%'" outlined="flase" style="border: none">

        <div class="d-flex justify-start" style="width: 100%">
        <v-btn
          to="/welcome"
          elevation="5"
          icon
          class="align-self-start grey darken-3 white--text mb-3"
        >
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
       <v-img
          max-height="46"
          max-width="46"
          src="../assets/GAV-logo.svg"
          class="mx-auto"
        ></v-img>
        </div>

        <h1 class="text-center mt-8 mb-16">Erstelle einen<br>Account</h1>

        <div class="inputField">
            <v-text-field label="E-Mail"></v-text-field>
            <v-text-field label="Passwort"></v-text-field>
            <v-text-field label="Passwort nochmal eingeben"></v-text-field>
        </div>

        <v-btn elevation="5" fab class="align-self-end grey darken-3 white--text mt-16">
          <v-icon> mdi-arrow-right </v-icon>
        </v-btn>
      </v-card>
    </v-container>
</template>

<script>
  export default {
    name: "SignUp",
    data: () => ({

    }),
  }
</script>

<style scoped>
.inputField{
  width: 80%;
}
</style>