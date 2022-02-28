<template>
  <v-container class="d-flex flex-column align-center">
<<<<<<< HEAD
    <Favorites></Favorites>
    <Route></Route>
=======
>>>>>>> 06dee6cf16c5e68674bd3e821d85ce22e272ccc2
  </v-container>
</template>

<script>
import Favorites from './Favorites.vue';
import Route from './Route.vue';
import { bus } from '../main';
export default {
  name: 'Home',
  data: () => ({}),
<<<<<<< HEAD
  components: {
    Favorites,
    Route,
  },
  created() {
    bus.$data.userId = VueCookies.get('userId');
    bus.$data.loggedIn = VueCookies.get('loggedIn');
=======
  methods: {
  },
  created() {
>>>>>>> 06dee6cf16c5e68674bd3e821d85ce22e272ccc2
    console.log('User eingeloggt mit der ID: ' + bus.$data.userId);
    bus.$emit('title', 'Home');
  },
};
</script>

<style scoped></style>
