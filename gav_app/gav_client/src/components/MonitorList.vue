<template>
  <div>
    <v-list v-if="monitors.length > 0" three-line class="py-1 ma-3 rounded-lg">
      <v-list-item v-for="(mon, i) in monitors" :key="i">
        <v-list-item-avatar tile :color="lineColor(mon)">
          <span class="white--text">{{ mon.lineName }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle>
            <span>{{ mon.towards }}</span>
            <span style="float: right">
              {{
                mon.departures[0]
                  ? mon.departures[0].countdown
                  : 'Derzeit keine Auskunft verfügbar...'
              }}
              min
            </span>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            <span>{{
              mon.departures[1]
                ? mon.departures[1].timePlanned.substr(11, 5)
                : '--:--'
            }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            <span>{{
              mon.departures[2]
                ? mon.departures[2].timePlanned.substr(11, 5)
                : '--:--'
            }}</span>
          </v-list-item-subtitle>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'MonitorList',
  props: {
    monitors: Array,
  },
  methods: {
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
};
</script>
