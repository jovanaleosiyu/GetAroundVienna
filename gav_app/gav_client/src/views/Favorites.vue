<template>
  <v-container>
    <v-sheet elevation="4" class="rounded-lg pa-3">
      <div class="mb-3 text-h5">Favoriten</div>
      <FavWidget></FavWidget>
    </v-sheet>
  </v-container>
</template>

<script>
import FavWidget from '../components/FavWidget.vue';

export default {
  components: {
    FavWidget,
  },
};
</script>
