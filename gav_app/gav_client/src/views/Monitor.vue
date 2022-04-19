<template>
  <v-container>
    <v-sheet class="px-6 py-1 ma-3 rounded-lg">
      <v-autocomplete
        v-model="model"
        :items="stops"
        item-text="name"
        item-value="DIVA"
        hide-no-data
        hide-selected
        @change="searchStop"
        label="Haltestelle"
      ></v-autocomplete>
    </v-sheet>
    <v-list v-if="monitors" three-line class="py-1 ma-3 rounded-lg">
      <v-list-item v-for="(mon, i) in monitors" :key="i">
        <v-list-item-avatar tile :color="lineColor(mon)">
          <span class="white--text">{{ mon.lineName }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> {{ mon.towards }} </v-list-item-title>
          <v-list-item-subtitle class="text-right">
            <span>{{ mon.departures[0].countdown }} min</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            <!-- <span>{{ mon.departures[1].countdown }}</span> -->
            <span>01:12</span>
            <!-- <span>{{ mon.departures[0].timePlanned.substr(11, 4) }}</span> -->
          </v-list-item-subtitle>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { bus } from '../main';
export default {
  data() {
    return {
      // Searchfield
      stops: [],
      model: null,
      search: null,
      monitors: [],
    };
  },
  methods: {
    async searchStop() {
      const { data } = await bus.$data.instance.get(
        `/stops/monitor/${this.model}`
      );
      console.log(data);
      this.monitors = data;
    },
    lineColor(mon) {
      if (mon.type == 'ptTram') return 'red darken-1';
      switch (mon.lineName) {
        case 'U1':
          return 'red';
        case 'U2':
          return 'purple';
        case 'U3':
          return 'orange';
        case 'U4':
          return 'green';
        case 'U6':
          return 'brown';
        default:
          return 'black';
      }
    },
  },
  async created() {
    const { data } = await bus.$data.instance.get('/stops');
    this.stops = data;
  },
};
</script>

<style lang="scss" scoped></style>
