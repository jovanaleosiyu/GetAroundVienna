<template>
  <v-container>
    <!-- Stops list -->
    <h3 class="mb-3">Haltestellen</h3>
      <v-slide-group show-arrows>
        <v-slide-item
          v-for="s in favStops"
          :key="s.favid"
          v-slot="{ active }"
          class="favspace"
        >
          <!-- Favorite icon  -->
          <div class="d-flex flex-column align-center mx-3">
            <v-btn
              icon
              elevation="3"
              x-large
              :class="s.color"
              :input-value="active"
              @click="favEventStop(s)"
            >
              <v-icon color="white">mdi-{{ s.icon }}</v-icon>
            </v-btn>
            <span class="my-2 favtitle">{{ s.title }}</span>
          </div>
        </v-slide-item>
        <v-slide-item>
          <div class="mx-3">
            <!-- Stops dialog  -->
            <v-dialog v-model="dialogStop" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon x-large elevation="3" v-bind="attrs" v-on="on"  class="my-1">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h6" v-if="mode == ''">
                  Favorit erstellen
                </v-card-title>
                <v-card-title class="text-h6" v-if="mode == 'edit'">
                  Favorit bearbeiten
                </v-card-title>
                <v-container class="justify-center" width="50">
                  <v-row align="center" justify="center">
                    <v-col cols="12" align="center">
                      <v-menu offset-y>
                        <template v-slot:activator="{ attrs, on }">
                          <v-btn
                            large
                            icon
                            :class="iconcolor"
                            v-model="iconcolor"
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
                        v-model="nameStop"
                        label="Name"
                        required
                        counter
                        maxlength="10"
                      ></v-text-field>

                      <RouteInput
                        title="Haltestelle"
                        @setStop="setStop"
                      ></RouteInput>
                    </v-col>
                  </v-row>
                </v-container>

                <v-card-actions class="justify-center">
                  <v-spacer></v-spacer>
                  <v-btn icon large class="grey darken-3" @click="addStop">
                    <v-icon color="white">mdi-check</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-slide-item>
      </v-slide-group>
    <!-- Routes list -->
    <h3 class="mb-3 mt-4">Routen</h3>

    <v-sheet class="mx-auto" max-width="700">
      <v-slide-group show-arrows>
        <v-slide-item
          v-for="t in favTrips"
          :key="t.favid"
          v-slot="{ active }"
          class="favspace"
        >
          <div class="d-flex flex-column align-center mx-3">
            <v-btn
              icon
              elevation="3"
              x-large
              :class="t.color"
              :input-value="active"
              @click="favEventTrip(t)"
            >
              <v-icon color="white">mdi-{{ t.icon }}</v-icon>
            </v-btn>
            <span class="my-2 favtitle">{{ t.title }}</span>
          </div>
        </v-slide-item>
        <v-slide-item>
          <div class="mx-3">
            <!-- Dialog route  -->
            <v-dialog v-model="dialogRoute" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon x-large elevation="3" v-bind="attrs" v-on="on" class="my-1">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <!-- Routes dialog  -->
              <v-form>
                <v-card>
                  <v-card-title class="text-h6" v-if="mode == ''">
                    Favorit erstellen
                  </v-card-title>
                  <v-card-title class="text-h6" v-if="mode == 'edit'">
                    Favorit bearbeiten
                  </v-card-title>
                  <v-container class="justify-center" width="50">
                    <v-row align="center" justify="center">
                      <v-col cols="12" align="center">
                        <v-menu offset-y>
                          <template v-slot:activator="{ attrs, on }">
                            <v-btn
                              large
                              icon
                              :class="iconcolortrip"
                              v-model="iconcolor"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon color="white"
                                >mdi-{{ iconimagetrip }}</v-icon
                              >
                            </v-btn>
                          </template>
                          <div>
                            <v-btn
                              icon
                              small
                              v-for="col in colors"
                              :class="col"
                              :key="col"
                              @click="iconcolortrip = col"
                            ></v-btn>
                          </div>
                          <v-divider></v-divider>
                          <div>
                            <v-btn
                              v-for="icon in icons"
                              :class="icon"
                              :key="icon"
                              @click="iconimagetrip = icon"
                            >
                              <v-icon large color="black"
                                >mdi-{{ icon }}</v-icon
                              >
                            </v-btn>
                          </div>
                        </v-menu>
                      </v-col>
                      <v-col cols="10">
                        <v-text-field
                          v-model="nameRoute"
                          counter
                          maxlength="10"
                          label="Name"
                          required
                        ></v-text-field>

                        <RouteInput
                          title="Start"
                          @setStop="setStopRoute"
                          required
                        ></RouteInput>

                        <RouteInput
                          title="Ziel"
                          @setStop="setStopRoute"
                          required
                        ></RouteInput>
                      </v-col>
                      <v-col cols="11">
                        <v-expansion-panels flat>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              >Filtern</v-expansion-panel-header
                            >
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
                    <v-btn
                      icon
                      large
                      class="grey darken-3"
                      v-if="mode == ''"
                      @click="addRoute"
                    >
                      <v-icon color="white">mdi-check</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      large
                      class="grey darken-3"
                      v-if="mode == 'edit'"
                      @click="updateRoute(t)"
                    >
                      <v-icon color="white">mdi-check</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
            <!-- Delete dialog  -->
            <v-dialog v-model="dialogDelete" max-width="290">
              <v-card>
                <v-card-title> Bist du sicher? </v-card-title>

                <v-card-text>
                  Du kannst den Vorgang nicht mehr rückgängig machen.
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="green darken-1" text @click="delFav(t.id)">
                    Löschen
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialogDelete = false"
                  >
                    Abbrechen
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div class="d-flex justify-end">
      <v-btn
        icon
        @click="mode = mode == 'edit' ? '' : 'edit'"
        :color="mode == 'edit' ? 'blue' : ''"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="mode = mode == 'delete' ? '' : 'delete'"
        :color="mode == 'delete' ? 'red' : ''"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import RouteInput from '../components/RouteInputField.vue';
import { bus } from '../main';

export default {
  components: {
    // PopupRoute,
    RouteInput,
  },
  data() {
    return {
      dialogStop: false,
      favStops: [],
      favTrips: [],
      mode: '',
      //stops
      dialogRoute: false,
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
      haltestelle: '',
      nameStop: '',
      //trips
      iconcolortrip: '',
      iconimagetrip: '',
      start: '',
      ziel: '',
      currentId: undefined,
      nameRoute: '',
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
      dialogDelete: false,
      // delMode: false,
    };
  },
  methods: {
    async getFavPoints() {
      const { data } = await bus.$data.instance.get('/favorites?type=point');
      this.favStops = data;
    },
    async getFavTrips() {
      const { data } = await bus.$data.instance.get('/favorites?type=trip');
      this.favTrips = data;
    },
    async delFav(id) {
      await bus.$data.instance.delete(`/favorites/${id}`);
      this.dialogDelete = false;
      this.getFavPoints();
      this.getFavTrips();
    },
    // async updateFav(fav) {
    //   await bus.$data.instance.patch(`/favorites/${fav.id}`, fav);
    // },
    favEventStop() {
      // route ausführung
      switch (this.mode) {
        case 'edit':
          this.dialogStop = true;
          break;
        case 'delete':
          break;
        default:
          break;
      }
    },
    favEventTrip(t) {
      // route ausführung
      switch (this.mode) {
        case 'edit':
          this.dialogRoute = true;
          this.iconcolortrip = t.color;
          this.iconimagetrip = t.icon;
          this.nameRoute = t.title;
          this.currentId = t.id;
          console.log(t);
          break;
        case 'delete':
          this.dialogDelete = true;
          break;
        default:
          break;
      }
    },
    callRoute(trip) {
      bus.$emit('callTrip', trip);
      this.$router.push({ path: '/route' });
    },
    // stop methods
    async addStop() {
      if (this.haltestelle) {
        let stopData = {
          title: this.nameStop,
          icon: this.iconimage,
          color: this.iconcolor,
          ref: this.haltestelle.ref,
          type: this.haltestelle.type,
        };
        console.log(stopData);
        await bus.$data.instance.post('/favorites/points', stopData);
        this.dialogStop = false;
        this.getFavPoints();
      } else {
        console.log('error addStop');
        console.log(this.haltestelle);
      }
    },
    setStop(stop) {
      console.log(stop);
      if (stop.stopType === 'Haltestelle') this.haltestelle = stop;
      else console.log('error setStop');
    },
    // trip methods
    async addRoute() {
      if (this.start && this.ziel) {
        let routeData = {
          color: this.iconcolortrip,
          icon: this.iconimagetrip,
          origRef: this.start.ref,
          origType: this.start.type,
          destRef: this.ziel.ref,
          destType: this.ziel.type,
          title: this.nameRoute,
          options: {
            changeSpeed: this.changeSpeed,
            routeType: this.routeType,
          },
        };
        console.log(routeData);
        await bus.$data.instance.post('/favorites/trips', routeData);
        this.dialogRoute = false;
        this.getFavTrips();
      } else {
        // Fehlermeldung
        console.log('error addRoute');
      }
    },
    setStopRoute(stop) {
      console.log(stop);
      if (stop.stopType === 'Start') this.start = stop;
      else if (stop.stopType === 'Ziel') this.ziel = stop;
      else console.log('error');
    },
    async updateRoute() {
      // await bus.$data.instance.patch(`/favorites/trips/${this.id}`, {
      //   color: this.iconcolortrip,
      //   // title: 'Bla',
      //   // icon: 'school',
      //   // color: 'red',
      //   // origRef: '16.32019:48.15985:WGS84',
      //   // origType: 'coord',
      //   // destRef: '60200844',
      //   // destType: 'stop',
      //   // exclMeans: '1;5',
      //   // changeSpeed: 'slow',
      //   // routeType: 'leasttime',
      //   // maxChanges: '5',
      // });
    },
  },
  created() {
    this.getFavPoints();
    this.getFavTrips();
    bus.$emit('title', 'Favoriten');
    this.iconcolor = this.colors[0];
    this.iconimage = this.icons[0];
    this.iconcolortrip = this.colors[0];
    this.iconimagetrip = this.icons[0];
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
