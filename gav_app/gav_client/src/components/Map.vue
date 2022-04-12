<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>
<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      apiKey: process.env.GOOGLE_API_KEY,
      google: null,
      map: null,
      mapOptions: {
        zoom: 18,
        center: { lat: 0, lng: -180 },
      },
      path: [
        { lat: 48.15687, lng: 16.3305 },
        { lat: 48.15672, lng: 16.33104 },
        { lat: 48.15717, lng: 16.33132 },
        { lat: 48.15759, lng: 16.33158 },
        { lat: 48.15808, lng: 16.33191 },
        { lat: 48.15877, lng: 16.33238 },
        { lat: 48.15903, lng: 16.33161 },
        { lat: 48.1591, lng: 16.33167 },
        { lat: 48.15919, lng: 16.33177 },
        { lat: 48.1593, lng: 16.33183 },
        { lat: 48.15964, lng: 16.33077 },
        { lat: 48.15968, lng: 16.33065 },
        { lat: 48.15978, lng: 16.33073 },
        { lat: 48.15979, lng: 16.33073 },
        { lat: 48.15985, lng: 16.33064 },
        { lat: 48.15986, lng: 16.33063 },
        { lat: 48.15989, lng: 16.33055 },
        { lat: 48.16024, lng: 16.3308 },
        { lat: 48.1603, lng: 16.33082 },
        { lat: 48.16052, lng: 16.33 },
        { lat: 48.1606, lng: 16.32968 },
      ],
    };
  },
  async mounted() {
    const loader = new Loader({
      apiKey: this.apiKey,
    });
    this.google = await loader.load();
    const mapContainer = this.$refs.googleMap;
    this.map = new this.google.maps.Map(mapContainer, this.mapOptions);
    // geolocation
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };
    //     this.map.setCenter(pos);
    //     const marker = new this.google.maps.Marker({
    //       position: pos,
    //       map: this.map,
    //     });
    //     console.log(marker);
    //   });
    // }
    // MARKER
    // const pos = {
    //   lat: 48.158098,
    //   lng: 16.331896,
    // };
    // this.map.setCenter(pos);
    // new this.google.maps.Marker({
    //   position: pos,
    //   map: this.map,
    // });
    // PATH
    const p = new this.google.maps.Polyline({
      path: this.path,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    this.map.setCenter(this.path[0]);
    p.setMap(this.map);
    new this.google.maps.Marker({
      position: this.path[0],
      map: this.map,
    });
    new this.google.maps.Marker({
      position: this.path[this.path.length - 1],
      map: this.map,
    });
  },

  methods: {},
};
</script>
<style>
.google-map {
  border: 1px solid black;
  width: 90vw;
  height: 80vh;
}
</style>
