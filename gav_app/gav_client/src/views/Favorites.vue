<template>
  <v-card class="mx-auto pa-2" rounded="xl" max-width="600" elevation="10">
    <v-card-title>Favoriten</v-card-title>
    <!-- Stops list -->
    <v-card-subtitle class="my-1">Haltestellen</v-card-subtitle>
    <v-sheet class="mx-auto" max-width="700">
      <v-slide-group show-arrows>
        <v-slide-item
          v-for="s in favStops"
          :key="s.favid"
          v-slot="{ active, toggle }"
          class="favspace"
        >
          <div class="d-flex flex-column align-center mx-3">
            <v-btn
              icon
              elevation="3"
              x-large
              :class="s.color"
              :input-value="active"
              @click="toggle"
            >
              <v-icon color="white">mdi-{{ s.icon }}</v-icon>
            </v-btn>
            <span class="my-2 favtitle">{{ s.title }}</span>
          </div>
        </v-slide-item>
        <v-slide-item>
          <div class="mx-3">
            <PopupStop @reload="getFavPoints"></PopupStop>
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <!-- Routes list -->
    <v-card-subtitle>Routen</v-card-subtitle>

    <v-sheet class="mx-auto" max-width="700">
      <v-slide-group show-arrows>
        <v-slide-item
          v-for="t in favTrips"
          :key="t.favid"
          v-slot="{ active, toggle }"
          class="favspace"
        >
          <div class="d-flex flex-column align-center mx-3">
            <v-btn
              icon
              elevation="3"
              x-large
              :class="t.color"
              :input-value="active"
              @click="toggle"
            >
              <v-icon color="white">mdi-{{ t.icon }}</v-icon>
            </v-btn>
            <span class="my-2 favtitle">{{ t.title }}</span>
          </div>
        </v-slide-item>
        <v-slide-item>
          <div class="mx-3">
            <PopupRoute @reload="getFavTrips"></PopupRoute>
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div class="d-flex justify-end">
      <v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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
  width: 62px;
}
</style>
