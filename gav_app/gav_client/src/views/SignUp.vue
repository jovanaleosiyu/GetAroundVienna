v-<template>
    <v-container class="d-flex flex-column align-center mt-16">
      <v-card class="d-flex flex-column align-center" :min-width="$vuetify.breakpoint.mdAndUp ? 450 :'100%'" outlined="flase" style="border: none">

        <div class="d-flex justify-start" style="width: 100%">

          <v-btn
            to="/welcome"
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
        
        <h1 class="text-center mt-8 mb-16">Erstelle einen<br>Account</h1>

        <div style="width: 80%">
            <v-text-field label="E-Mail"></v-text-field>
            <v-text-field label="Passwort"></v-text-field>
            <v-text-field label="Passwort nochmal eingeben"></v-text-field>
        </div>

        <v-btn elevation="4" fab class="align-self-end grey darken-3 white--text mt-16">
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
</style>