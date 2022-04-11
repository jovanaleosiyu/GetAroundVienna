<template>
  <v-container>
    <v-sheet elevation="4" class="rounded-lg pa-3">
      <h2 class="mb-3">Favoriten</h2>
      <!-- Stops list -->
      <h3 class="mb-3">Haltestellen</h3>
      <v-slide-group>
        <!-- Stop loop  -->
        <v-slide-item v-for="s in favStops" :key="s.favid" class="favspace">
          <div class="d-flex flex-column align-center mx-3">
            <v-badge
              bordered
              offset-x="16"
              offset-y="16"
              :value="mode"
              :color="mode == 'edit' ? edicol : delcol"
              :icon="`mdi-${mode == 'edit' ? 'pencil' : 'close'}`"
              overlap
            >
              <v-btn
                dark
                fab
                elevation="3"
                :class="s.color"
                @click="favEventStop(s)"
              >
                <v-icon>mdi-{{ s.icon }}</v-icon>
              </v-btn>
            </v-badge>
            <span class="my-2 favtitle">{{ s.title }}</span>
          </div>
        </v-slide-item>
        <!-- Add Stop -->
        <v-slide-item class="favspace">
          <div class="d-flex flex-column align-center mx-3">
            <v-btn
              fab
              elevation="3"
              @click="
                mode = '';
                dialogStop = true;
              "
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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
                  <v-btn
                    icon
                    x-large
                    elevation="3"
                    v-bind="attrs"
                    v-on="on"
                    class="my-1"
                  >
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
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            :nudge-left="112"
                          >
                            <template v-slot:activator="{ attrs, on }">
                              <v-btn
                                x-large
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
                            <div
                              class="
                                white
                                d-flex
                                flex-column
                                align-center
                                px-2
                                py-3
                              "
                            >
                              <div class="my-3">
                                <v-btn
                                  class="mx-1"
                                  icon
                                  v-for="col in colors"
                                  :class="col"
                                  :key="col"
                                  @click="iconcolortrip = col"
                                ></v-btn>
                              </div>
                              <div class="my-3">
                                <v-btn
                                  v-for="icon in icons"
                                  :class="icon"
                                  class="mx-1"
                                  icon
                                  :key="icon"
                                  @click="iconimagetrip = icon"
                                >
                                  <v-icon large color="black"
                                    >mdi-{{ icon }}</v-icon
                                  >
                                </v-btn>
                              </div>
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
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <!-- Modes -->
      <div class="d-flex justify-end">
        <v-btn
          icon
          @click="mode = mode == 'edit' ? '' : 'edit'"
          :color="mode == 'edit' ? edicol : ''"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="mode = mode == 'delete' ? '' : 'delete'"
          :color="mode == 'delete' ? delcol : ''"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <!-- Dialogs -->
      <!-- Stop dialog  -->
      <v-dialog v-model="dialogStop" width="450">
        <v-card>
          <v-card-title class="text-h6">
            Favorit {{ mode == 'edit' ? 'bearbeiten' : 'erstellen' }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-center pb-0">
            <!-- Icon and color selection -->
            <v-menu offset-y :nudge-left="112">
              <!-- Selection button -->
              <template v-slot:activator="{ attrs, on }">
                <v-badge
                  class="my-3"
                  bordered
                  offset-x="16"
                  offset-y="16"
                  color="grey darken-3"
                  icon="mdi-swap-horizontal"
                  overlap
                >
                  <v-btn
                    v-if="mode"
                    fab
                    :class="editedStop.color"
                    v-model="editedStop.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="white">mdi-{{ editedStop.icon }}</v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    x-large
                    :class="newStop.color"
                    v-model="newStop.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="white">mdi-{{ newStop.icon }}</v-icon>
                  </v-btn>
                </v-badge>
              </template>
              <!-- Selection menu -->
              <div class="white d-flex flex-column align-center px-2 py-3">
                <div class="my-3">
                  <v-btn
                    icon
                    v-for="col in colors"
                    :class="col"
                    class="mx-1"
                    :key="col"
                    @click="
                      mode ? (editedStop.color = col) : (newStop.color = col)
                    "
                  ></v-btn>
                </div>
                <div class="my-3">
                  <v-btn
                    icon
                    v-for="icon in icons"
                    :class="icon"
                    :key="icon"
                    @click="
                      mode ? (editedStop.icon = icon) : (newStop.icon = icon)
                    "
                    class="mx-1"
                  >
                    <v-icon large color="black">mdi-{{ icon }}</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-menu>
            <!-- Form -->
            <v-form
              ref="stopForm"
              lazy-validation
              v-model="stopValid"
              style="width: 90%"
            >
              <!-- Edit stop -->
              <div v-if="mode">
                <v-text-field
                  v-model="editedStop.title"
                  label="Name"
                  :counter="10"
                  :rules="nameRules"
                  required
                />
              </div>
              <!-- New stop -->
              <div v-else>
                <v-text-field
                  v-model="newStop.title"
                  label="Name"
                  :counter="10"
                  :rules="nameRules"
                  required
                />
                <RouteInput title="Haltestelle" @setStop="setStop" />
                <span class="error--text">{{ invStopMsg }}</span>
              </div>
            </v-form>
          </v-card-text>
          <!-- Action -->
          <v-card-actions class="justify-center">
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!stopValid"
              icon
              large
              class="grey darken-3 mb-3"
              @click="mode ? editStop() : addStop()"
            >
              <v-icon color="white">mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Delete dialog  -->
      <v-dialog v-model="dialogDelete" max-width="350">
        <v-card>
          <v-card-title class="font-weight-bold">
            Bist du dir sicher?
          </v-card-title>
          <v-card-text>
            Du kannst den Vorgang nicht mehr rückgängig machen.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="dark" text @click="dialogDelete = false">
              Abbrechen
            </v-btn>
            <v-btn color="error" @click="delFav"> Löschen </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-container>
</template>

<script>
import RouteInput from '../components/RouteInputField.vue';
import { bus } from '../main';

export default {
  components: {
    RouteInput,
  },
  data() {
    return {
      favStops: [],
      favTrips: [],
      // mode
      mode: '',
      edicol: 'blue',
      delcol: 'red',
      // dialog
      dialogStop: false,
      // stop
      newStop: {},
      editedStop: {},
      // delete
      deleteId: undefined,
      // stopform
      stopValid: true,
      invStopMsg: '',
      currItem: {},
      // form rules
      nameRules: [
        (v) => !!v || 'Name ist verpflichtend.',
        (v) =>
          (v && v.length <= 10) || 'Name darf maximal 10 Zeichen lang sein.',
      ],
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
      icons: ['home', 'school', 'tree', 'food', 'account', 'briefcase'],
      iconcolor: '',
      iconimage: '',
      haltestelle: '',
      nameStop: '',
      //trips
      iconcolortrip: '',
      iconimagetrip: '',
      start: '',
      ziel: '',
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
    };
  },
  methods: {
    async getFavStops() {
      const { data } = await bus.$data.instance.get('/favorites?type=point');
      this.favStops = data;
    },
    async getFavTrips() {
      const { data } = await bus.$data.instance.get('/favorites?type=trip');
      this.favTrips = data;
    },
    async delFav() {
      await bus.$data.instance.delete(`/favorites/${this.deleteId}`);
      this.dialogDelete = false;
      this.getFavStops();
      this.getFavTrips();
    },
    // stop methods
    favEventStop(stop) {
      switch (this.mode) {
        case 'edit':
          this.editedStop = { ...stop };
          this.dialogStop = true;
          break;
        case 'delete':
          this.deleteId = stop.favid;
          this.dialogDelete = true;
          break;
        default:
          // redirect to /route
          this.$router.push({
            path: 'route',
            query: {
              dest_type: stop.type,
              dest_ref: stop.ref,
            },
          });
          break;
      }
    },
    async addStop() {
      if (!this.$refs.stopForm.validate()) return;
      if (this.newStop.stop) {
        this.invStopMsg = '';
        let stopData = {
          title: this.newStop.title,
          icon: this.newStop.icon,
          color: this.newStop.color,
          ref: this.newStop.stop.ref,
          type: this.newStop.stop.type,
        };
        await bus.$data.instance.post('/favorites/points', stopData);
        this.dialogStop = false;
        this.getFavStops();
      } else {
        this.invStopMsg = 'Ungültige Haltestelle. ';
        this.stopValid = false;
      }
    },
    async editStop() {
      console.log(this.editedStop);
      // ... to be implemented
    },
    // trip methods
    favEventTrip(t) {
      // mode
      switch (this.mode) {
        case 'edit':
          this.dialogRoute = true;
          this.iconcolortrip = t.color;
          this.iconimagetrip = t.icon;
          this.nameRoute = t.title;
          this.currItem = t;
          break;
        case 'delete':
          console.log(t);
          this.currItem = t;
          console.log(this.currItem);
          this.dialogDelete = true;
          break;
        default:
          this.$router.push({
            path: 'route',
            query: {
              orig_type: t.orig_type,
              orig_ref: t.orig_ref,
              dest_type: t.dest_type,
              dest_ref: t.dest_ref,
            },
          });
          break;
      }
    },
    // For route input field
    setStop(stop) {
      if (stop.stopType === 'Haltestelle') {
        this.newStop.stop = stop;
        this.stopValid = true;
        this.invStopMsg = '';
      } else console.log('error setStop');
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
    this.getFavStops();
    this.getFavTrips();
    bus.$emit('title', 'Favoriten');
    // this.iconcolor = this.colors[0];
    // this.iconimage = this.icons[0];
    this.newStop.icon = this.icons[0];
    this.newStop.color = this.colors[0];
    this.iconcolortrip = this.colors[0];
    this.iconimagetrip = this.icons[0];
  },
};
</script>

<style>
.favtitle {
  white-space: nowrap;
  /* width: 100%; */
  width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.favrow {
  width: 100%;
}
.favspace {
  width: 62px;
  padding: 10px;
}
</style>
