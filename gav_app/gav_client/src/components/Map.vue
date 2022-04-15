<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>
<script>
// import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
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
      path2: [
        { lat: 48.16345, lng: 16.33167 },
        { lat: 48.16336, lng: 16.33154 },
        { lat: 48.16348, lng: 16.33135 },
        { lat: 48.16374, lng: 16.33095 },
        { lat: 48.1639, lng: 16.33067 },
        { lat: 48.16392, lng: 16.33064 },
        { lat: 48.16395, lng: 16.33059 },
        { lat: 48.16396, lng: 16.33056 },
        { lat: 48.16405, lng: 16.33042 },
        { lat: 48.16414, lng: 16.33027 },
        { lat: 48.1642, lng: 16.33015 },
        { lat: 48.16431, lng: 16.32996 },
        { lat: 48.16436, lng: 16.32982 },
        { lat: 48.16438, lng: 16.32979 },
        { lat: 48.16444, lng: 16.32964 },
        { lat: 48.16446, lng: 16.32958 },
        { lat: 48.1645, lng: 16.3295 },
        { lat: 48.16459, lng: 16.32928 },
        { lat: 48.16472, lng: 16.32894 },
        { lat: 48.16477, lng: 16.32882 },
        { lat: 48.16484, lng: 16.32868 },
        { lat: 48.16489, lng: 16.32858 },
        { lat: 48.1649, lng: 16.32855 },
        { lat: 48.16496, lng: 16.32846 },
        { lat: 48.16503, lng: 16.32834 },
        { lat: 48.16507, lng: 16.32829 },
        { lat: 48.16501, lng: 16.32816 },
        { lat: 48.16492, lng: 16.32794 },
        { lat: 48.16475, lng: 16.32785 },
        { lat: 48.16478, lng: 16.32773 },
        { lat: 48.16472, lng: 16.32759 },
      ],
    };
  },
  async mounted() {
    console.log(this.apiKey);
    console.log(process.env);
    // const loader = new Loader({
    //   apiKey: this.apiKey,
    // });
    // this.google = await loader.load();
    // const mapContainer = this.$refs.googleMap;
    // this.map = new this.google.maps.Map(mapContainer, this.mapOptions);
    // // geolocation
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
    // // PATH
    // const p = new this.google.maps.Polyline({
    //   path: this.path,
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 1.0,
    //   strokeWeight: 2,
    // });
    // // this.map.setCenter(this.path[0]);
    // p.setMap(this.map);
    // new this.google.maps.Marker({
    //   position: this.path[0],
    //   map: this.map,
    // });
    // new this.google.maps.Marker({
    //   position: this.path[this.path.length - 1],
    //   map: this.map,
    // });
    // // Path 2
    // const p2 = new this.google.maps.Polyline({
    //   path: this.path2,
    //   strokeColor: '#A0692F',
    //   strokeOpacity: 1.0,
    //   strokeWeight: 5,
    // });
    // p2.setMap(this.map);
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
