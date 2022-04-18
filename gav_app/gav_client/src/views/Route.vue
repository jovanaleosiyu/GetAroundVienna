<template>
  <v-container class="mx-auto pa-6" rounded="xl" max-width="600" elevation="10">
    <v-sheet elevation="4" class="rounded-lg px-3 my-3">
      <v-form class="d-flex align-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="175"
          viewBox="0 0 31 175"
          class="mr-3 py-11"
        >
          <g id="grafik" transform="translate(-45.698 -179.326)">
            <circle
              id="Ellipse_2"
              data-name="Ellipse 2"
              cx="15.5"
              cy="15.5"
              r="15.5"
              transform="translate(45.698 179.326)"
              fill="#a1a1a1"
            />
            <ellipse
              id="Ellipse_3"
              data-name="Ellipse 3"
              cx="15.5"
              cy="15"
              rx="15.5"
              ry="15"
              transform="translate(45.698 324.326)"
              fill="#1a1a1a"
            />
            <circle
              id="Ellipse_4"
              data-name="Ellipse 4"
              cx="3.5"
              cy="3.5"
              r="3.5"
              transform="translate(56.698 225.326)"
              fill="#d8d8d8"
            />
            <circle
              id="Ellipse_5"
              data-name="Ellipse 5"
              cx="3.5"
              cy="3.5"
              r="3.5"
              transform="translate(56.698 273.326)"
              fill="#d8d8d8"
            />
            <ellipse
              id="Ellipse_6"
              data-name="Ellipse 6"
              cx="3.5"
              cy="3"
              rx="3.5"
              ry="3"
              transform="translate(56.698 256.326)"
              fill="#d8d8d8"
            />
            <circle
              id="Ellipse_7"
              data-name="Ellipse 7"
              cx="3.5"
              cy="3.5"
              r="3.5"
              transform="translate(56.698 240.326)"
              fill="#d8d8d8"
            />
            <ellipse
              id="Ellipse_8"
              data-name="Ellipse 8"
              cx="3.5"
              cy="3"
              rx="3.5"
              ry="3"
              transform="translate(56.698 289.326)"
              fill="#d8d8d8"
            />
            <circle
              id="Ellipse_9"
              data-name="Ellipse 9"
              cx="3.5"
              cy="3.5"
              r="3.5"
              transform="translate(56.698 304.326)"
              fill="#d8d8d8"
            />
          </g>
        </svg>
        <div style="width: 100%">
          <RouteInputField ref="origin" title="Start" @setStop="setStop" />
          <RouteInputField ref="destination" title="Ziel" @setStop="setStop" />
        </div>

        <v-icon large class="my-auto ml-3 darkgrey--text" @click="swap()">
          mdi-swap-vertical
        </v-icon>
      </v-form>

      <div class="d-flex align-center">
        <v-btn-toggle v-model="depArr" mandatory>
          <v-btn small :value="true">Ab</v-btn>
          <v-btn small :value="false">An</v-btn>
        </v-btn-toggle>
        <v-menu
          ref="menu"
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Zeit Wählen"
              readonly
              v-bind="attrs"
              v-on="on"
              class="mx-3"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu1"
            v-model="time"
            format="24h"
            full-width
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>

        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-left="170"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Datum Wählen"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
        <v-btn
          elevation="5"
          @click="getTrip()"
          fab
          small
          :loading="loading"
          :disabled="loading"
          class="accent ml-3"
        >
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </div>
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header> Filtern </v-expansion-panel-header>
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
    </v-sheet>

    <v-expansion-panels class="rounded-lg" accordion>
      <v-expansion-panel v-for="(trip, i) of trips" :key="i">
        <v-expansion-panel-header expand-icon="" class="px-2">
          <div class="flex-column my-1">
            <div class="d-flex mb-2">
              {{ trip.steps[0].start.time }} <v-spacer></v-spacer>
              {{ trip.duration }} <v-spacer></v-spacer>
              {{ trip.steps[trip.steps.length - 1].end.time }}
            </div>

            <div class="d-flex align-center">
              <div :class="`point ${Testcolor}`"></div>
              <div class="d-flex" style="width: 100%">
                <template v-for="(step, j) of trip.steps">
                  <RouteStep
                    :key="j"
                    :stepName="step.mode.name"
                    :stepType="step.mode.type"
                    :duration="step.duration"
                    :tripDuration="trip.duration"
                  ></RouteStep>
                </template>
              </div>
              <div class="point"></div>
            </div>

            <div class="d-flex justify-center mt-2">
              <span v-for="(step, j) of trip.steps" :key="j" class="ml-1">{{
                step.mode.name
              }}</span>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-icon>mdi-clock-outline</v-icon> {{ trip.duration }} <br />
          {{ trip.steps[0].start.time }} {{ trip.steps[0].start.name }} <br />

          <div v-for="(step, j) of trip.steps" :key="j" class="my-3">
            <div class="d-flex">
              <div
                style="
                  width: 10px;
                  height: 100;
                  background-color: black;
                  border-radius: 5px;
                "
                class="mx-4"
              ></div>
              <div v-if="!step.isChange" style="width: 100%">
                {{ step.mode.direction }} <br />
                {{ step.start.time }} {{ step.start.name }} <br />
                <div class="d-flex">
                  <v-expansion-panels flat v-if="step.stopSeq.length - 2 > 0">
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        expand-icon=""
                        class="pa-0 ma-0"
                      >
                        <v-divider></v-divider>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div class="flex-column">
                          <p v-for="x in step.stopSeq.length - 2" :key="x">
                            {{ step.stopSeq[x].datetime.split(' ')[1] }}
                            {{ step.stopSeq[x].name }}
                          </p>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
                {{ step.end.time }} {{ step.end.name }} <br />
              </div>

              <div v-if="step.isChange" style="width: 100%">
                Umstieg <br />
                Dauer: {{ step.duration }}min<br />
              </div>
            </div>
          </div>
          {{ trip.steps[trip.steps.length - 1].end.time }}
          {{ trip.steps[trip.steps.length - 1].end.name }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import RouteInputField from '../components/RouteInputField.vue';
import RouteStep from '../components/RouteStep.vue';
import { bus } from '../main';

export default {
  name: 'Route',
  components: {
    RouteInputField,
    RouteStep,
  },
  props: {
    query: Object,
  },
  data: () => ({
    Testcolor: 'black',
    loading: false,

    depInput: '',
    desInput: '',

    dep: {},
    des: {},

    menu1: false,
    menu2: false,

    depArr: '',
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
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

    trips: [],
  }),
  methods: {
    async getTrip() {
      this.loading = true;
      if (!this.dep || !this.des) return;
      let time, date;
      if (this.time) time = this.time.replaceAll(':', '');
      if (this.date) date = this.date.replaceAll('-', '');
      const params = {
        typeOrigin: this.dep.type,
        nameOrigin: this.dep.ref,
        typeDestination: this.des.type,
        nameDestination: this.des.ref,
        time: time,
        date: date,
        depArr: this.depArr ? 'dep' : 'arr',
        maxChanges: this.maxChanges,
        routeType: this.routeType,
        changeSpeed: this.changeSpeed,
        excludedMeans: this.excludedMeans,
      };
      const { data } = await bus.$data.instance.get('/trip', {
        params,
      });

      let newSteps = [];
      const newTrips = { ...data };
      for (let t = 0; t < data.length; t++) {
        newSteps = [];
        const newStep = {
          ...data[t].steps[0],
          isChange: false,
        };
        newSteps.push(newStep);
        for (let s = 1; s < data[t].steps.length; s++) {
          if (
            this.checkChange(
              data[t].steps[s - 1].end.time,
              data[t].steps[s].start.time
            )
          ) {
            const newStep = {
              isChange: true,
              duration: this.getChangeTime(
                data[t].steps[s - 1].end.time,
                data[t].steps[s].start.time
              ).toString(),
              mode: {
                type: 'Fussweg',
                name: '',
              },
            };
            newSteps.push(newStep);
            const step = {
              ...data[t].steps[s],
              isChange: false,
            };
            newSteps.push(step);
          } else if (
            !this.checkChange(
              data[t].steps[s - 1].end.time,
              data[t].steps[s].start.time
            )
          ) {
            const newStep = {
              ...data[t].steps[s],
              isChange: false,
            };
            newSteps.push(newStep);
          }
        }
        newTrips[t].steps = newSteps;
      }

      this.trips = [];
      this.trips = newTrips;

      this.$forceUpdate();
      this.loading = false;
    },
    async setOriginToCurrPos() {
      // TODO Button for current pos
      const pos = await this.getCurrPos();
      if (!pos) {
        alert('Geolocation nicht verfügbar...');
        return;
      }
      const lng = pos.coords.longitude.toFixed(5);
      const lat = pos.coords.latitude.toFixed(5);
      const currref = `${lng}:${lat}:WGS84`;
      this.dep.ref = currref;
      this.dep.type = 'coord';
      origin.setStopByRef(this.dep.ref, this.dep.type);
    },
    setStop(stop) {
      console.log(stop);
      if (stop.stopType == 'Start') {
        this.dep.ref = stop.ref;
        this.dep.type = stop.type;
      } else if (stop.stopType == 'Ziel') {
        this.des.ref = stop.ref;
        this.des.type = stop.type;
      } else console.log('Error!');
    },
    swap() {
      const { origin, destination } = this.$refs;
      if (!destination.model || !origin.model) return;
      const temp = origin.model;
      origin.setStopByRef(destination.model.ref, destination.model.type);
      destination.setStopByRef(temp.ref, temp.type);
    },
    checkChange(stepEnd, stepStart) {
      return this.getChangeTime(stepEnd, stepStart) > 1;
    },
    getChangeTime(stepEnd, stepStart) {
      let changeTime =
        this.translateTripDuration(stepStart) -
        this.translateTripDuration(stepEnd);
      console.log('ChangeTime: ' + changeTime);
      return changeTime;
    },
    translateTripDuration(tripDuration) {
      let splitDuration = tripDuration.split(':');
      if (parseInt(splitDuration[0]) == 0) {
        return 24 * 60 + parseInt(splitDuration[1]);
      } else
        return parseInt(splitDuration[0]) * 60 + parseInt(splitDuration[1]);
    },
    getCurrPos() {
      const options = {
        maximumAge: 10000,
        timeout: 5000,
        enableHighAccuracy: true,
      };
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      );
    },
  },
  async mounted() {
    // Query Routes
    const { orig_ref, orig_type, dest_ref, dest_type } = this.query;
    // If both, set destination and origin
    if (orig_ref && orig_type && dest_ref && dest_type) {
      // TODO tripoptions
      // this.maxChanges = this.query.maxchanges;
      // this.routeType = this.query.routetype;
      // this.changeSpeed = this.query.changespeed;
      // this.excludedMeans = this.query.exclmeans;
      this.dep.type = orig_type;
      this.dep.ref = orig_ref;
      this.des.type = dest_type;
      this.des.ref = dest_ref;
      this.depArr = 'dep';
      const { origin, destination } = this.$refs;
      const promises = [];
      promises.push(origin.setStopByRef(this.dep.ref, this.dep.type));
      promises.push(destination.setStopByRef(this.des.ref, this.des.type));
      Promise.all(promises).then(() => {
        this.getTrip();
      });
    }
    // If only destination, set origin to current location
    else if (dest_ref && dest_type) {
      const pos = await this.getCurrPos();
      if (!pos) {
        alert('Geolocation nicht verfügbar...');
        return;
      }
      const lng = pos.coords.longitude.toFixed(5);
      const lat = pos.coords.latitude.toFixed(5);
      const currref = `${lng}:${lat}:WGS84`;
      this.dep.ref = currref;
      this.dep.type = 'coord';
      this.des.ref = dest_ref;
      this.des.type = dest_type;
      this.depArr = 'dep';
      const { origin, destination } = this.$refs;
      const promises = [];
      promises.push(origin.setStopByRef(this.dep.ref, this.dep.type));
      promises.push(destination.setStopByRef(this.des.ref, this.des.type));
      Promise.all(promises).then(() => {
        this.getTrip();
      });
    }
  },
};
</script>

<style scoped>
.point {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: black;
}
</style>
