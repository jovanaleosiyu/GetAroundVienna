<template>
  <v-container class="d-flex flex-column">
    <div>
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
          <RouteInputField
            title="Start"
            :searchString="depInput"
            @setStop="setStop"
          ></RouteInputField>
          <RouteInputField
            title="Ziel"
            :searchString="desInput"
            @setStop="setStop"
          ></RouteInputField>
        </div>

        <v-icon large class="my-auto ml-3 darkgrey--text" @click="swap()">
          mdi-swap-vertical
        </v-icon>
      </v-form>
    </div>

    <div>
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
            format="24hr"
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
          class="grey darken-3 white--text ml-3"
        >
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </div>
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header> Optionen </v-expansion-panel-header>
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
    </div>
    
    <!-- <div v-for="(trip, i) of trips" :key="i" class="flex-column">
      <div class="d-flex mb-1">
        {{ trip.steps[0].start.time }} <v-spacer></v-spacer>
        {{ trip.duration }} <v-spacer></v-spacer>
        {{ trip.steps[trip.steps.length - 1].end.time }}
      </div>

      <div class="d-flex align-center">
        <div :class="`point ${testcolor}`"></div>
        <div class="d-flex" style="width: 100%">
          <template v-for="(step, j) of trip.steps">
            <RouteStep :key="j" :stepName=step.mode.name :stepType=step.mode.type :duration=step.duration :tripDuration=trip.duration ></RouteStep>
          </template>
        </div>
        <div class="point"></div>
      </div>

      <div class="d-flex justify-center mt-1">
        <span v-for="(step, j) of trip.steps" :key="j" class="ml-1">{{
          step.mode.name
        }}</span>
      </div>
    </div> -->

    
    <v-expansion-panels class="rounded-xl" accordion>
    <v-expansion-panel v-for="(trip, i) of trips" :key="i">
      <v-expansion-panel-header expand-icon="" class="px-2">
        <div class="flex-column my-1">
        <div class="d-flex mb-2">
        {{ trip.steps[0].start.time }} <v-spacer></v-spacer> {{ trip.duration }} <v-spacer></v-spacer> {{ trip.steps[trip.steps.length - 1].end.time }}
      </div>

      <div class="d-flex align-center">
        <div :class="`point ${Testcolor}`" ></div>
        <div class="d-flex" style="width: 100%">
          <template v-for="(step, j) of trip.steps">
            <RouteStep :key="j" :stepName=step.mode.name :stepType=step.mode.type :duration=step.duration :tripDuration=trip.duration ></RouteStep>
          </template>
        </div>
        <div class="point"></div>
      </div>

      <div class="d-flex justify-center mt-2">
        <span v-for="(step, j) of trip.steps" :key="j" class="ml-1">{{ step.mode.name }}</span>
      </div>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>

        <v-icon>mdi-clock-outline</v-icon> {{ trip.duration }} <br>
        {{trip.steps[0].start.time}} {{trip.steps[0].start.name}} <br>

        <div v-for="(step, j) of trip.steps" :key="j" class="my-3">
          <div class="d-flex">
          <div style="width: 10px; height: 100; background-color: red; border-radius: 5px;" class="mx-4"></div>
          <div style="width: 100%;">
            {{ step.mode.direction }} <br>
          {{ step.start.time }} {{ step.start.name }} <br>
          <div class="d-flex">

          <v-expansion-panels flat v-if="step.stopSeq.length-2 > 0">
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="" class="pa-0 ma-0">
                <v-divider></v-divider>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="flex-column">
                  <p v-for="x in step.stopSeq.length-2" :key="x" >{{ step.stopSeq[x].datetime.split(' ')[1] }} {{ step.stopSeq[x].name }}</p>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          </div>
          {{ step.end.time }} {{ step.end.name }} <br>
          </div>
        </div>
        </div>

        {{ trip.steps[trip.steps.length - 1].end.time }} {{ trip.steps[trip.steps.length - 1].end.name }}

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </v-container>
</template>

<script>
import axios from 'axios';
import RouteInputField from '../components/RouteInputField.vue';
import RouteStep from '../components/RouteStep.vue';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000',
});

export default {
  name: 'Route',
  components: {
    RouteInputField,
    RouteStep,
  },
  data: () => ({
    Testcolor: "red",

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
    test() {
      this.$router.push({ name: 'Home' });
    },
    async getTrip() {
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
      console.log(params);
      const { data } = await instance.get('/trip', {
        params,
      });
      console.log(data);
      this.trips = [];
      this.trips = data.map((d) => ({
        ...d,
      }));
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
    translateTripDuration(tripDuration){
      let splitDuration = tripDuration.split(':');
      return parseInt(splitDuration[0])*60 + parseInt(splitDuration[1]);
    },
    calDifference(start, end){
      if(start != undefined && end != undefined){
        console.log(start);
        console.log(end);
        let transStart = this.translateTripDuration(start);
        let transEnd = this.translateTripDuration(end);
        let difference = transStart - transEnd;
        return difference
      }
    },
    swap(){
      console.log(this.depInput);
    },
  },
  created() {
    console.log();
  },
};
</script>

<style scoped>
.point{
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: black;
}
</style>
