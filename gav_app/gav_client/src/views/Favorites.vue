<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-card-title>Favoriten</v-card-title>
    <!-- Stops list -->
    <v-card-subtitle class="my-1">Haltestellen</v-card-subtitle>
    <v-list class="d-flex flex-row">
      <v-list-item>
        <div>
          <v-btn icon elevation="3" large class="red">
            <v-icon color="white">mdi-home</v-icon>
          </v-btn>
          <p class="my-2">Home</p>
        </div>
      </v-list-item>
      <v-list-item>
        <div>
          <Popup></Popup>
        </div>
      </v-list-item>
    </v-list>
    <!-- Routes list -->
    <v-card-subtitle>Routen</v-card-subtitle>
    <v-list class="d-flex flex-row">
      <v-list-item>
        <div>
          <v-btn icon elevation="3" large class="red">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <p>Home</p>
        </div>
      </v-list-item>
      <v-list-item>
        <div>
          <Popup></Popup>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import Popup from '../components/Favorites_Popup.vue';
export default {
  components: {
    Popup,
  },
};
</script>

<style lang="scss" scoped></style>
