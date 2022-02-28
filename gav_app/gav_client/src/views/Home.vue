<template>
  <v-container class="d-flex flex-column align-center">
  </v-container>
</template>

<script>
import { bus } from '../main';
export default {
  name: 'Home',
  data: () => ({}),
  methods: {
  },
  created() {
    console.log('User eingeloggt mit der ID: ' + bus.$data.userId);
    bus.$emit('title', 'Home');
  },
};
</script>

<style scoped></style>
