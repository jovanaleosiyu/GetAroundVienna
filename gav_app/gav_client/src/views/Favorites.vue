<template>
  <v-container>
    <v-sheet elevation="4" class="rounded-lg pa-3">
      <h2 class="mb-3 font-weight-medium">Favoriten</h2>
      <!-- Stops list -->
      <h4 class="mb-3 font-weight-medium">Haltestellen</h4>
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
      <h4 class="mb-3 font-weight-medium">Routen</h4>
      <v-slide-group>
        <!-- Route loop  -->
        <v-slide-item v-for="t in favTrips" :key="t.favid" class="favspace">
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
                :class="t.color"
                @click="favEventTrip(t)"
              >
                <v-icon>mdi-{{ t.icon }}</v-icon>
              </v-btn>
            </v-badge>
            <span class="my-2 favtitle">{{ t.title }}</span>
          </div>
        </v-slide-item>
        <!-- Add Trip -->
        <v-slide-item class="favspace">
          <div class="d-flex flex-column align-center mx-3">
            <v-btn
              fab
              elevation="3"
              @click="
                mode = '';
                dialogTrip = true;
              "
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-slide-item>
      </v-slide-group>
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
      <v-dialog eager v-model="dialogStop" width="450">
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
                <RouteInput
                  ref="stopInp"
                  title="Haltestelle"
                  @setStop="setEditStop"
                />
                <span class="error--text">{{ invStopMsg }}</span>
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
              dark
              @click="mode ? editStop() : addStop()"
            >
              <v-icon color="white">mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Trip dialog  -->
      <v-dialog eager v-model="dialogTrip" width="450">
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
                    :class="editedTrip.color"
                    v-model="editedTrip.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="white">mdi-{{ editedTrip.icon }}</v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    x-large
                    :class="newTrip.color"
                    v-model="newTrip.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="white">mdi-{{ newTrip.icon }}</v-icon>
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
                      mode ? (editedTrip.color = col) : (newTrip.color = col)
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
                      mode ? (editedTrip.icon = icon) : (newTrip.icon = icon)
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
              ref="tripForm"
              lazy-validation
              v-model="tripValid"
              style="width: 90%"
            >
              <!-- Edit Trip -->
              <div v-if="mode">
                <v-text-field
                  v-model="editedTrip.title"
                  label="Name"
                  :counter="10"
                  :rules="nameRules"
                  required
                />
                <!-- <RouteInput title="Start" @setStop="setStopTrip" required />
                <RouteInput title="Ziel" @setStop="setStopTrip" required /> -->
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Filtern</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-select
                        v-model="editedTrip.maxchanges"
                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
                        hint="Anzahl der Umstiege"
                        persistent-hint
                      ></v-select>
                      <v-select
                        v-model="editedTrip.routetype"
                        :items="routeTypes"
                        hint="Art der Route"
                        item-text="text"
                        item-value="type"
                        persistent-hint
                      ></v-select>
                      <v-select
                        v-model="editedTrip.changespeed"
                        :items="changeSpeeds"
                        hint="Umsteige Zeit"
                        item-text="text"
                        item-value="speed"
                        persistent-hint
                      ></v-select>
                      <v-select
                        v-model="editedTrip.exclmeans"
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
                <span class="error--text">{{ invTripMsg }}</span>
              </div>
              <!-- New Trip -->
              <div v-else>
                <v-text-field
                  v-model="newTrip.title"
                  label="Name"
                  :counter="10"
                  :rules="nameRules"
                  required
                />
                <RouteInput title="Start" @setStop="setStopTrip" required />
                <RouteInput title="Ziel" @setStop="setStopTrip" required />
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Filtern</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-select
                        v-model="newTrip.maxChanges"
                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
                        hint="Anzahl der Umstiege"
                        persistent-hint
                      ></v-select>
                      <v-select
                        v-model="newTrip.routeType"
                        :items="routeTypes"
                        hint="Art der Route"
                        item-text="text"
                        item-value="type"
                        persistent-hint
                      ></v-select>
                      <v-select
                        v-model="newTrip.changeSpeed"
                        :items="changeSpeeds"
                        hint="Umsteige Zeit"
                        item-text="text"
                        item-value="speed"
                        persistent-hint
                      ></v-select>
                      <v-select
                        v-model="newTrip.excludedMeans"
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
                <span class="error--text">{{ invTripMsg }}</span>
              </div>
            </v-form>
          </v-card-text>
          <!-- Action -->
          <v-card-actions class="justify-center">
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!tripValid"
              icon
              large
              class="mb-3 grey darken-3"
              dark
              @click="mode ? editTrip() : addTrip()"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Delete dialog -->
      <v-dialog eager v-model="dialogDelete" max-width="350">
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
      dialogTrip: false,
      dialogDelete: false,
      // stop
      newStop: {},
      editedStop: {},
      // stopform
      stopValid: true,
      invStopMsg: '',
      // trip
      newTrip: {},
      editedTrip: {},
      // tripform
      tripValid: true,
      invTripMsg: '',
      // delete
      deleteId: undefined,
      // form rules
      nameRules: [
        (v) => !!v || 'Name ist verpflichtend.',
        (v) =>
          (v && v.length <= 10) || 'Name darf maximal 10 Zeichen lang sein.',
      ],
      // icon/color selections
      colors: [
        'red darken-1',
        'purple darken-1',
        'orange darken-1',
        'green darken-1',
        'cyan darken-1',
        'deep-orange darken-3',
      ],
      icons: ['home', 'school', 'tree', 'food', 'account', 'briefcase'],
      // filter options
      routeType: 'leasttime',
      routeTypes: [
        { text: 'Kürzeste Route', type: 'leasttime' },
        { text: 'Wenigste Umstiege', type: 'leastinterchange' },
        { text: 'Wenigstes Gehen', type: 'leastwalking' },
      ],
      changeSpeeds: [
        { text: 'Lang', speed: 'slow' },
        { text: 'Mittel', speed: 'normal' },
        { text: 'Kurz', speed: 'fast' },
      ],
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
    async favEventStop(stop) {
      switch (this.mode) {
        case 'edit':
          console.log(stop);
          this.editedStop = { ...stop };
          // Set Inp field
          await this.$refs.stopInp.setStopByRef(
            this.editedStop.ref,
            this.editedStop.type
          );
          this.dialogStop = true;
          break;
        case 'delete':
          this.deleteId = stop.favid;
          this.dialogDelete = true;
          break;
        default:
          // redirect to /route
          this.$router.push({
            path: '/route',
            query: {
              dest_type: stop.type,
              dest_ref: stop.ref,
            },
          });
          break;
      }
    },
    setStop(stop) {
      if (stop.stopType === 'Haltestelle') {
        this.newStop.stop = stop;
        this.stopValid = true;
        this.invStopMsg = '';
      } else console.log('error setStop');
    },
    setEditStop(stop) {
      if (stop.stopType === 'Haltestelle') {
        this.editedStop.stop = stop;
        this.stopValid = true;
        this.invStopMsg = '';
      } else console.log('error setStop');
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
      if (!this.$refs.stopForm.validate()) return;
      if (this.editedStop.ref && this.editedStop.type) {
        this.invStopMsg = '';
        let stopData = {
          title: this.editedStop.title,
          icon: this.editedStop.icon,
          color: this.editedStop.color,
          ref: this.editedStop.ref,
          type: this.editedStop.type,
        };
        await bus.$data.instance.put(
          '/favorites/points/' + this.editedStop.favid,
          stopData
        );
        this.getFavStops();
        this.dialogStop = false;
      } else {
        this.invStopMsg = 'Ungültige Haltestelle. ';
        this.stopValid = false;
      }
    },
    // trip methods
    favEventTrip(trip) {
      switch (this.mode) {
        case 'edit':
          this.editedTrip = { ...trip };
          this.dialogTrip = true;
          break;
        case 'delete':
          this.deleteId = trip.favid;
          this.dialogDelete = true;
          break;
        default:
          // redirect to /route
          this.$router.push({
            path: '/route',
            query: {
              orig_type: trip.orig_type,
              orig_ref: trip.orig_ref,
              dest_type: trip.dest_type,
              dest_ref: trip.dest_ref,
            },
          });
          break;
      }
    },
    setStopTrip(stop) {
      if (stop.stopType === 'Start') {
        this.newTrip.orig = stop;
        this.tripValid = true;
        this.invTripMsg = '';
      } else if (stop.stopType === 'Ziel') {
        this.newTrip.dest = stop;
        this.tripValid = true;
        this.invTripMsg = '';
      } else console.log('error');
    },
    async addTrip() {
      if (!this.$refs.tripForm.validate()) return;
      if (!this.newTrip.orig) {
        this.invTripMsg = 'Ungültiger Startpunkt. ';
        this.tripValid = false;
        return;
      } else if (!this.newTrip.dest) {
        this.invTripMsg = 'Ungültiger Zielpunkt. ';
        this.tripValid = false;
        return;
      }
      this.invTripMsg = '';
      let tripData = {
        title: this.newTrip.title,
        icon: this.newTrip.icon,
        color: this.newTrip.color,
        origType: this.newTrip.orig.type,
        destType: this.newTrip.dest.type,
        origRef: this.newTrip.orig.ref,
        destRef: this.newTrip.dest.ref,
        options: {
          changeSpeed: this.newTrip.changeSpeed,
          routeType: this.newTrip.routeType,
          maxChanges: this.newTrip.maxChanges,
          excludedMeans: this.newTrip.excludedMeans,
        },
      };
      await bus.$data.instance.post('/favorites/trips', tripData);
      this.dialogTrip = false;
      this.getFavTrips();
    },
    async editTrip() {
      console.log(this.editedTrip);
    },
  },
  created() {
    this.getFavStops();
    this.getFavTrips();
    // Init icon and color
    this.newStop.icon = this.icons[0];
    this.newStop.color = this.colors[0];
    this.newTrip.icon = this.icons[0];
    this.newTrip.color = this.colors[0];
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
  font-size: 0.9em;
}
.favrow {
  width: 100%;
}
.favspace {
  width: 62px;
  padding: 10px;
}
</style>
