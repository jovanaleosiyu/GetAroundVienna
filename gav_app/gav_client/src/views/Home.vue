<template>
  <v-container class="d-flex flex-column align-center">
    <Favorites></Favorites>
    <Route></Route>
  </v-container>
</template>

<script>
import Favorites from './Favorites.vue';
import Route from './Route.vue';
import { bus } from '../main';
import VueCookies from 'vue-cookies';
export default {
  name: 'Home',
  data: () => ({}),
  components: {
    Favorites,
    Route,
  },
  created() {
    bus.$data.userId = VueCookies.get('userId');
    bus.$data.loggedIn = VueCookies.get('loggedIn');
    console.log('User eingeloggt mit der ID: ' + bus.$data.userId);
    bus.$emit('title', 'Home');
  },
};
</script>

<style scoped></style>
