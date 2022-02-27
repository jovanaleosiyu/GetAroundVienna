<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon x-large elevation="3" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6"> Favorit erstellen </v-card-title>
      <v-container class="justify-center" width="50">
        <v-row align="center" justify="center">
          <v-col cols="12" align="center">
            <v-menu offset-y>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  large
                  icon
                  :class="iconcolor"
                  v-model="color"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="white">mdi-{{ iconimage }}</v-icon>
                </v-btn>
              </template>
              <div>
                <v-btn
                  icon
                  small
                  v-for="col in colors"
                  :class="col"
                  :key="col"
                  @click="iconcolor = col"
                ></v-btn>
              </div>
              <v-divider></v-divider>
              <div>
                <v-btn
                  v-for="icon in icons"
                  :class="icon"
                  :key="icon"
                  @click="iconimage = icon"
                >
                  <v-icon large color="black">mdi-{{ icon }}</v-icon>
                </v-btn>
              </div>
            </v-menu>
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <RouteInput title="Start" @setStop="setStop"></RouteInput>

            <RouteInput title="Ziel" @setStop="setStop"></RouteInput>
          </v-col>
          <v-col cols="11">
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>Filtern</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-select
                    v-model="maxChanges"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
                    hint="Anzahl der Umstiege"
                    persistent-hint
                  ></v-select>
                  <v-select
                    v-model="routeType"
                    :items="routeTypes"
                    hint="Art der Route"
                    item-text="text"
                    item-value="type"
                    persistent-hint
                  ></v-select>
                  <v-select
                    v-model="changeSpeed"
                    :items="changeSpeeds"
                    hint="Umsteige Zeit"
                    item-text="text"
                    item-value="speed"
                    persistent-hint
                  ></v-select>
                  <v-select
                    v-model="excludedMeans"
                    :items="ids"
                    hint="Verkehrmittel"
                    item-text="text"
                    item-value="id"
                    persistent-hint
                    multiple
                  ></v-select>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>
        <v-btn icon large class="grey darken-3" @click="addRoute">
          <v-icon color="white">mdi-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import axios from 'axios';
import RouteInput from './RouteInputField.vue';

// const instance = axios.create({
//   withCredentials: true,
//   baseURL: 'http://localhost:3000',
// });

export default {
  data() {
    return {
      dialog: false,
      colors: [
        'red darken-1',
        'purple darken-1',
        'orange darken-1',
        'green darken-1',
        'cyan darken-1',
        'deep-orange darken-3',
      ],
      icons: ['home', 'school', 'tree', 'food'],
      iconcolor: '',
      iconimage: '',
      start: '',
      ziel: '',
      name: '',
      //filter
      maxChanges: 9,

      routeType: 'leasttime',
      routeTypes: [
        { text: 'Kürzeste Route', type: 'leasttime' },
        { text: 'Wenigste Umstiege', type: 'leastinterchange' },
        { text: 'Wenigstes Gehen', type: 'leastwalking' },
      ],

      changeSpeed: 'normal',
      changeSpeeds: [
        { text: 'Lang', speed: 'slow' },
        { text: 'Mittel', speed: 'normal' },
        { text: 'Kurz', speed: 'fast' },
      ],

      excludedMeans: undefined,
      ids: [
        { text: 'Zug', id: '0' },
        { text: 'S-Bahn', id: '1' },
        { text: 'U-Bahn', id: '2' },
        { text: 'Stadtbahn', id: '3' },
        { text: 'Straßen-/Trambahn', id: '4' },
        { text: 'Stadtbus', id: '5' },
        { text: 'Regionalbus', id: '6' },
        { text: 'Schnellbus', id: '7' },
        { text: 'Seil-/Zahnradbahn', id: '8' },
        { text: 'Schiff', id: '9' },
        { text: 'AST/Rufbus', id: '10' },
        { text: 'Sonstiges', id: '11' },
      ],
    };
  },
  methods: {
    async addRoute(start, ziel) {
      if (this.start && this.ziel) {
        let routeData = {
          color: this.iconcolor,
          icon: this.iconimage,
          origRef: start.ref,
          origType: start.type,
          destRef: ziel.ref,
          destType: ziel.type,
          title: this.name,
          options: {
            
          }

          //           {
          //   "title": "Weg 123",
          //   "icon": "food",
          //   "color": "red",
          //   "origRef": "16.31933:48.16815:WGS84",
          //   "origType":"coord",
          //   "destRef": "60201468",
          //   "destType": "stop",
          //   "options": {
          //     "changeSpeed": "slow",
          //     "routeType": "leastinterchange"
          //   }
          // }
          //input ziel
        };
        console.log(routeData);
        // await instance.post('/favorites?type=trip', routeData);
      } else {
        // Fehlermeldung
      }
    },
    setStop(stop) {
      console.log(stop);
      if (stop.stopType === 'Start') this.start = stop;
      else if (stop.stopType === 'Ziel') this.ziel = stop;
      else console.log('error');
    },
  },
  components: {
    RouteInput,
  },
  created() {
    this.iconcolor = this.colors[0];
    this.iconimage = this.icons[0];
  },
};
</script>

<style>
.favspace {
  width: 15%;
}
</style>
