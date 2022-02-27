<template>
  <v-card class="mx-auto pa-2" rounded="xl" max-width="600" elevation="10">
    <v-card-title>Favoriten</v-card-title>
    <!-- Stops list -->
    <v-card-subtitle class="my-1">Haltestellen</v-card-subtitle>
    <div class="d-flex flex-row align-start favrow">
      <div
        v-for="s in favStops"
        :key="s.favid"
        class="d-flex flex-column align-center favspace"
      >
        <v-btn icon elevation="3" x-large :class="s.color">
          <v-icon color="white">mdi-{{ s.icon }}</v-icon>
        </v-btn>
        <span class="my-2 favtitle">{{ s.title }}</span>
      </div>
      <div class="d-flex justify-center favspace">
        <PopupStop></PopupStop>
      </div>
    </div>
    <!-- Routes list -->
    <v-card-subtitle>Routen</v-card-subtitle>
    <div class="d-flex flex-row align-start favrow">
      <div
        v-for="t in favTrips"
        :key="t.favid"
        class="d-flex flex-column align-center favspace"
      >
        <v-btn icon elevation="3" x-large :class="t.color">
          <v-icon color="white">mdi-{{ t.icon }}</v-icon>
        </v-btn>
        <span class="my-2 favtitle">{{ t.title }}</span>
      </div>
      <div class="d-flex justify-center favspace">
        <PopupRoute></PopupRoute>
      </div>
    </div>
  </v-card>
</template>

<script>
import PopupRoute from '../components/Favorites_Route.vue';
import PopupStop from '../components/Favorites_Stop.vue';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000',
});

export default {
  components: {
    PopupRoute,
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
      const { data } = await instance.get('/favorites');
      this.favorites = data;
    },
    async getFavPoints() {
      const { data } = await instance.get('/favorites?type=point');
      this.favStops = data;
    },
    async getFavTrips() {
      const { data } = await instance.get('/favorites?type=trip');
      this.favTrips = data;
    },
    async addFavStop() {
      const { data } = await instance.get('/favorites?type=point');
      this.favTrips = data;
    },
    async addFavRoute() {
      const { data } = await instance.get('/favorites?type=trip');
      this.favTrips = data;
    },
  },
  created() {
    this.getFavPoints();
    this.getFavTrips();
  },
};
</script>

<style>
.favtitle {
  white-space: nowrap;
}
.favrow {
  width: 100%;
}
.favspace {
  width: 15%;
}
</style>
