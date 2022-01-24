<template>
  <v-card class="mx-auto pa-2" rounded="xl" max-width="600" elevation="10">
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
        <v-list-item v-for="t in favTrips" :key="t.favid">
          <div>
            <v-btn icon elevation="3" large class="red">
              <!-- <v-icon>mdi-{{ t.icon }}</v-icon> -->
            </v-btn>
            <p class="my-2">{{ t.title }}</p>
          </div>
        </v-list-item>
        <!-- <v-list-item>
          <div>
            <PopupRoute></PopupRoute>
          </div>
        </v-list-item> -->
      </v-list>
    </div>
  </v-card>
</template>

<script>
// import PopupRoute from '../components/Favorites_Route.vue';
import PopupStop from '../components/Favorites_Stop.vue';
import axios from 'axios';
export default {
  components: {
    // PopupRoute,
    PopupStop,
  },
  data() {
    return {
      favStops: [],
      favTrips: [],
    };
  },
  methods: {
    async getFavorites() {
      this.favorites = (
        await axios.get('http://localhost:3000/favorites')
      ).data;
    },
    async getFavPoints() {
      this.favStops = (
        await axios.get('http://localhost:3000/favorites?type=point')
      ).data;
    },
    async getFavTrips() {
      this.favTrips = (
        await axios.get('http://localhost:3000/favorites?type=trip')
      ).data;
      axios
        .get('http://localhost:3000/favorites?type=trip')
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.getFavPoints();
    this.getFavTrips();
  },
};
</script>

<style lang="scss" scoped></style>
