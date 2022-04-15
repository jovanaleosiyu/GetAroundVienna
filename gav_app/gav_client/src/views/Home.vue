<template>
  <div class="d-flex flex-column align-center">
    <!-- Map -->
    <Map class="home-map" />
    <!-- Widgets -->
    <v-container fluid class="rounded-t-xl mt-n12 bg widget-wrapper">
      <v-expansion-panels flat multiple v-model="panels" style="border: none">
        <!-- Routes -->
        <v-expansion-panel class="rounded-xl">
          <v-expansion-panel-header class="text-h5">
            Routen
          </v-expansion-panel-header>
          <v-expansion-panel-content> TODO </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Favorites -->
        <v-expansion-panel class="rounded-xl">
          <v-expansion-panel-header class="text-h5">
            Favoriten
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <FavWidget :actions="false" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Planer -->
        <v-expansion-panel class="rounded-xl">
          <v-expansion-panel-header class="text-h5">
            Planer
          </v-expansion-panel-header>
          <v-expansion-panel-content> TODO </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Monitor -->
        <v-expansion-panel class="rounded-xl">
          <v-expansion-panel-header class="text-h5">
            Monitor
          </v-expansion-panel-header>
          <v-expansion-panel-content> TODO </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
// import { bus } from '../main';
import FavWidget from '../components/FavWidget.vue';
import Map from '../components/Map';
export default {
  name: 'Home',
  components: {
    Map,
    FavWidget,
  },
  data: () => ({
    panels: [0, 1, 2, 3],
  }),
  methods: {},
  created() {},
};
</script>

<style>
.home-map {
  width: 100vw;
  height: 32vh;
  z-index: 1;
}

.widget-wrapper {
  z-index: 5;
}

.bg {
  background-color: #fcfcfc;
}
</style>
