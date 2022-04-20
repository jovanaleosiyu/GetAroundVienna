<template>
  <v-container class="d-flex flex-column align-center mt-16">
    <v-card
      class="d-flex flex-column align-center transparent"
      :min-width="$vuetify.breakpoint.mdAndUp ? 450 : '100%'"
      :outlined="true"
      style="border: none"
    >
      <!-- Sign Up -->
      <div class="d-flex justify-start" style="width: 100%">
        <!-- Backbutton -->
        <v-btn to="/" icon class="my-auto">
          <v-icon class="black--text" large> mdi-chevron-left </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <!-- Logo -->
        <v-img
          max-height="46"
          max-width="46"
          src="../assets/GAV-logo.svg"
          class="mr-9"
        ></v-img>

        <v-spacer></v-spacer>
      </div>

      <!-- Title -->
      <h1 class="text-center mt-8 mb-16">Erstelle einen<br />Account</h1>

      <!-- Error -->
      <v-alert
        class="mb-12"
        color="red"
        elevation="4"
        outlined
        text
        type="error"
        v-if="error"
        >{{ errorMessage }}</v-alert
      >

      <!-- Anmelde Formular -->
      <v-form
        class="d-flex flex-column align-center"
        v-model="valid"
        style="width: 100%"
      >
        <div style="width: 80%">
          <!-- E-Mail Eingabefeld -->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-Mail"
            required
          ></v-text-field>

          <!-- Passwort Eingabefeld -->
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            label="Passwort"
            required
          ></v-text-field>

          <!-- Passwort Bestätigen -->
          <v-text-field
            v-model="confirmePassword"
            :rules="[passwordConfirmationRule]"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            @keyup.enter="register"
            label="Passwort nochmal eingeben"
            required
          ></v-text-field>
        </div>

        <!-- Sign Up Button -->
        <v-btn
          elevation="5"
          @click="register"
          :disabled="!valid"
          fab
          class="align-self-end grey darken-3 white--text mt-16"
        >
          <v-icon> mdi-arrow-right </v-icon>
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { bus } from '../main';
import VueCookies from 'vue-cookies';
export default {
  name: 'SignUp',
  data: () => ({
    show1: false,
    show2: false,
    valid: true,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail ist erforderlich',
      (v) => /.+@.+\..+/.test(v) || 'E-mail muss passend sein',
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Passwort ist erforderlich'],
    confirmePassword: '',
    confirmePasswordRules: [(v) => !!v || 'Eingabe erforderlich'],
    errorMessage: '',
    error: false,
  }),
  methods: {
    async register() {
      var data = {
        email: this.email,
        password: this.password,
      };
      await bus.$data.instance
        .post('/register', data)
        .then((response) => {
          bus.$data.userId = response.data;
          VueCookies.set('userId', response.data);
          VueCookies.set('loggedIn', true);
          bus.$emit('loggedIn', true);
          this.$emit('loadUser');
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          if (error.response.status == 409) {
            this.errorMessage = 'E-Mail wurde bereits verwendet!';
            this.error = true;
          } else {
            this.errorMessage = 'Daten sind nicht passend!';
            this.error = true;
          }
        });
    },
  },

  computed: {
    passwordConfirmationRule() {
      return (
        this.password === this.confirmePassword ||
        'Passwort muss übereinstimmen'
      );
    },
  },
};
</script>

<style scoped></style>
