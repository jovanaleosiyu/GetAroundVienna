v-<template>
    <div class="d-flex flex-column mt-16">
        <v-btn
        to="/welcome"
        elevation="5"
        icon
        class="grey darken-3 white--text mb-3"
        ><v-icon
            left
        >
          mdi-arrow-left
        </v-icon></v-btn>
        <v-img
        max-height="140"
        max-width="140"
        src="../assets/GAV-logo.svg"
        class="mx-auto"
        ></v-img>
        <h1 class="text-center mt-8 mb-16">Erstelle einen<br>Account</h1>
        <div class="mx-12" max-width="100">
            <v-text-field
            label="E-Mail"
            ></v-text-field>
            <v-text-field label="Passwort"></v-text-field>
            <v-text-field label="Passwort nochmal eingeben"></v-text-field>
        </div>

        <v-btn
        elevation="5"
        icon
        class="grey darken-3 white--text"
        ><v-icon
            left
        >
          mdi-arrow-right
        </v-icon>
        </v-btn>
    </div>
</template>

<script>
  export default {
    name: "SignUp",
    data: () => ({

    }),
  }
</script>