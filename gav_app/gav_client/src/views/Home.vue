<template>
  <v-container class="d-flex flex-column align-center">
      <h1>Home</h1>
  </v-container>
</template>

<script>
import { bus } from "../main";
import VueCookies from 'vue-cookies';
export default {
  name: "Home",
  data: () => ({}),
  created () {
    bus.$data.userId = VueCookies.get('userId');
    console.log(bus.$data.userId);
    alert("User eingeloggt"+bus.$data.userId);
  },
};
</script>

<style scoped></style>
