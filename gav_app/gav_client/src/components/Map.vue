<template>
  <div class="google-map" ref="googleMap"></div>
</template>
<script>
// import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
      google: null,
      map: null,
      mapOptions: { zoom: 18, center: { lat: 0, lng: -180 } },
    };
  },
  async mounted() {
    // const loader = new Loader({
    //   apiKey: this.apiKey,
    // });
    // this.google = await loader.load();
    // const mapContainer = this.$refs.googleMap;
    // this.map = new this.google.maps.Map(mapContainer, this.mapOptions);
    // geolocation
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };
    //       this.map.setCenter(pos);
    //       const marker = new this.google.maps.Marker({
    //         position: pos,
    //         map: this.map,
    //       });
    //       console.log(marker);
    //     },
    //     (err) => console.log(err),
    //     { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    //   );
    // }
    // // MARKER
    // // const pos = {
    // //   lat: 48.158098,
    // //   lng: 16.331896,
    // // };
    // // this.map.setCenter(pos);
    // // new this.google.maps.Marker({
    // //   position: pos,
    // //   map: this.map,
    // // });
  },

  methods: {},
};
</script>
<style>
.google-map {
  /* border: 1px solid black; */
  background-color: #888;
  /* width: 100%;
  height: 100%; */
}
</style>
