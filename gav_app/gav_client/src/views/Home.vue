<template>
  <v-container class="d-flex flex-column align-center">
    <Map />
  </v-container>
</template>

<script>
import { bus } from '../main';
import Map from '../components/Map';
export default {
  name: 'Home',
  components: {
    Map,
  },
  data: () => ({}),
  methods: {},
  created() {
    const bla =
      '16.33050,48.15687 16.33104,48.15672 16.33132,48.15717 16.33158,48.15759 16.33191,48.15808 16.33238,48.15877 16.33161,48.15903 16.33167,48.15910 16.33177,48.15919 16.33183,48.15930 16.33077,48.15964 16.33065,48.15968 16.33073,48.15978 16.33073,48.15979 16.33064,48.15985 16.33063,48.15986 16.33055,48.15989 16.33080,48.16024 16.33082,48.16030 16.33000,48.16052 16.32968,48.16060';
    const x = bla.split(' ');
    const res = [];
    console.log(x);
    let n;
    for (let coords of x) {
      console.log(coords);
      n = coords.split(',');
      console.log(n);
      res.push({
        lat: Number(n[1]),
        lng: Number(n[0]),
      });
    }
    console.log(JSON.stringify(res));
    console.log('User eingeloggt mit der ID: ' + bus.$data.userId);
  },
};
</script>

<style scoped></style>
