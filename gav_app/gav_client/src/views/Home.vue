<template>
  <v-container class="d-flex flex-column align-center">
    
  </v-container>
</template>

<script>
import { bus } from '../main';
import VueCookies from 'vue-cookies';
export default {
  name: 'Home',
  data: () => ({}),
  created() {
    bus.$data.userId = VueCookies.get('userId');
    bus.$data.loggedIn = VueCookies.get('loggedIn')
    console.log('User eingeloggt mit der ID: ' + bus.$data.userId);
    bus.$emit('title', 'Home');
  },
};
</script>

<style scoped></style>
