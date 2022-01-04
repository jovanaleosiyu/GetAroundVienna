<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-card-title>Favoriten</v-card-title>
    <!-- Stops list -->
    <v-card-subtitle class="my-1">Haltestellen</v-card-subtitle>
    <div class="d-flex">
      <v-list class="d-flex flex-row align-start">
        <v-list-item>
          <div>
            <v-btn icon elevation="3" large class="red">
              <v-icon color="white">mdi-home</v-icon>
            </v-btn>
            <p class="my-2">Home</p>
          </div>
        </v-list-item>
        <v-list-item>
          <PopupStop></PopupStop>
        </v-list-item>
      </v-list>
    </div>
    <!-- Routes list -->
    <v-card-subtitle>Routen</v-card-subtitle>
    <div class="d-flex">
      <v-list class="d-flex flex-row align-start">
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
            <PopupRoute></PopupRoute>
          </div>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import PopupRoute from '../components/Favorites_Route.vue';
import PopupStop from '../components/Favorites_Stop.vue';
export default {
  components: {
    PopupRoute,
    PopupStop,
  },
};
</script>

<style lang="scss" scoped></style>
