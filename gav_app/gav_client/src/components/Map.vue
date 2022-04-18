<template>
  <div class="google-map" ref="googleMap"></div>
</template>
<script>
import { Loader } from '@googlemaps/js-api-loader';
import { bus } from '../main';

export default {
  props: {
    markers: Array,
    paths: Array,
    center: {
      type: Object,
      default: () => ({
        lat: 48.20889357826833,
        lng: 16.373446912056732,
      }), // Stephansplatz
    },
    centerCurrPos: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      google: null,
      map: null,
      mapOptions: {
        zoom: 18,
        zoomControl: false,
        minZoom: 12,
        maxZoom: 21,
        center: this.center,
        restriction: {
          latLngBounds: {
            north: 49,
            south: 47,
            east: 17,
            west: 16,
          },
        },
      },
    };
  },
  async mounted() {
    console.log(this.center);
    console.log(this.markers);
    console.log(this.paths);
    if (!bus.$data.google) {
      console.log('loading...');
      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
      });
      bus.$data.google = await loader.load();
    }
    this.google = bus.$data.google;
    const mapContainer = this.$refs.googleMap;
    this.map = new this.google.maps.Map(mapContainer, this.mapOptions);
    if (this.centerCurrPos) {
      const position = await this.getCurrPos();
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.map.setCenter(pos);
      this.setMarker(pos.lat, pos.lng);
    }
  },
  methods: {
    getCurrPos() {
      const options = {
        maximumAge: 10000,
        timeout: 5000,
        enableHighAccuracy: true,
      };
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      );
    },
    setMarker(lat, lng) {
      new this.google.maps.Marker({
        position: { lat, lng },
        map: this.map,
      });
    },
  },
};
</script>
<style>
.google-map {
  background-color: #888;
}
.custom-map-control-button {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 40px;
  cursor: pointer;
}
.custom-map-control-button:hover {
  background: rgb(235, 235, 235);
}
</style>
