<template>
  <v-container>
    <v-sheet height="600" class="pa-4">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        type="month"
        color="primary"
        event-overlap-mode="stack"
        :events="events"
        @click:event="showRoute"
      ></v-calendar>
    </v-sheet>

    <div class="flex-column pa-4">
      <div class="d-flex align-center mb-3">
      <h1>Routinen</h1>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" width="500">

      <template v-slot:activator="{ on, attrs }">
        <v-btn elevation="5" v-bind="attrs" v-on="on" fab small class="grey lighten-3 black--text ml-3">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5">
          <span class="mx-auto">Eintrag erstellen</span>
        </v-card-title>

        <v-card-text>
          <div class="flex-column">

            <div class="d-flex align-center">
              <v-text-field label="Title" v-model="title"></v-text-field>
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-left="280"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-model="color"
                  v-bind="attrs"
                  v-on="on"
                  :color="color"
                  fab
                  x-small
                  class="ml-6"
                ></v-btn>
              </template>
              <v-color-picker
                  v-model="color"
                  dot-size="25"
                  hide-inputs
                ></v-color-picker>
              </v-menu>
            </div>

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
          @setStop="setStop"
        ></RouteInputField>
        <RouteInputField
          title="Ziel"
          @setStop="setStop"
        ></RouteInputField>
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
        v-model="menu4"
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
          v-if="menu4"
          v-model="time"
          format="24hr"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>

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

    <v-divider class="my-4"></v-divider>
            <div class="d-flex justify-space-between align-center mb-2">
              <h2>Startdatum</h2>
              <v-menu
                v-model="menu1"
                :close-on-content-click="true"
                :nudge-left="165"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-model="date1"
                    v-bind="attrs"
                    v-on="on"
                    color="primary"
                    text
                  >{{ date1 }}</v-btn>
                </template>
                <v-date-picker v-model="date1" @input="menu1 = false"></v-date-picker>
              </v-menu>
            </div>

            <div class="d-flex justify-space-between align-center">
              <h2>Enddatum</h2>
              <v-menu
                v-model="menu2"
                :close-on-content-click="true"
                :nudge-left="165"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-model="date2"
                    v-bind="attrs"
                    v-on="on"
                    color="primary"
                    text
                  >{{ date2 }}</v-btn>
                </template>
                <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </div>
          </div>

          <v-divider class="my-4"></v-divider>

          <div>
            <h2>Wiederholungen</h2>
          </div>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-space-between align-center">
            <h2>Benachrichtigung</h2>
            <v-switch
              v-model="notification"
            ></v-switch>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            fab
            small
            @click="test"
            class="my-2"
          >
          <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </div>

      <div v-for="(event, e) of events" :key="e">
        <div class="d-flex justify-space-between align-center">
          <div>
            {{ event.name }}<br>
            {{ event.start.split(" ")[1] }}
          </div>
          <div>
            <div :style="`height: 30px; width: 30px;border-radius: 50%; background-color: ${event.color};`"></div>
          </div>
      </div>
      <v-divider class="my-2"></v-divider>
    </div>
    </div>
  </v-container>
</template>

<script>
import RouteInputField from '../components/RouteInputField.vue';
import { bus } from '../main';
  export default {
    components: {
      RouteInputField,
    },
    data: () => ({
      value: '',
      events: [
        {
          name: "Schule",
          start: "2022-02-28 11:59",
          end: "2022-02-28 12:28",
          color: "#7A007A",
          typeOrigin: "stop",
          nameOrigin: "60200491",
          typeDestination: "stop",
          nameDestination: "60200048",
          time: "1200",
          date: "20220228",
          depArr: "dep",
          maxChanges: 9,
          routeType: "leasttime",
          changeSpeed: "normal"
        },
        {
          name: "Arzt",
          start: "2022-02-22 11:59",
          end: "2022-02-22 12:28",
          color: "#007A7A",
          typeOrigin: "stop",
          nameOrigin: "60200491",
          typeDestination: "stop",
          nameDestination: "60200048",
          time: "1200",
          date: "20220228",
          depArr: "dep",
          maxChanges: 9,
          routeType: "leasttime",
          changeSpeed: "normal"
        },
      ],
      dialog: false,
      title: '',
      menu1: false,
      menu2: false,
      menu3: false,
      date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
      notification: false,
      color: '#000000',

      depInput: '',
    desInput: '',

    dep: {},
    des: {},

    menu4: false,

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
    //   async getTrip() {
    //   if (!this.dep || !this.des) return;
    //   let time, date;
    //   if (this.time) time = this.time.replaceAll(':', '');
    //   if (this.date) date = this.date.replaceAll('-', '');
    //   const params = {
    //     typeOrigin: this.dep.type,
    //     nameOrigin: this.dep.ref,
    //     typeDestination: this.des.type,
    //     nameDestination: this.des.ref,
    //     time: time,
    //     date: date,
    //     depArr: this.depArr ? 'dep' : 'arr',
    //     maxChanges: this.maxChanges,
    //     routeType: this.routeType,
    //     changeSpeed: this.changeSpeed,
    //     excludedMeans: this.excludedMeans,
    //   };
    //   const { data } = await bus.$data.instance.get('/trip', {
    //     params,
    //   });
    //   console.log(data);
    //   this.trips = [];
    //   this.trips = data.map((d) => ({
    //     ...d,
    //   }));
    // },
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
    async test(){
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
      console.log(data);
      this.trips = [];
      this.trips = data.map((d) => ({
        ...d,
      }));
      let trip = this.trips[0]
      let event = {
        name: this.title,
        start: this.date1 + " " + trip.steps[0].start.time,
        end: this.date2 + " " + trip.steps[trip.steps.length - 1].end.time,
        color: this.color,
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
      }
      this.events.push(event);
      this.dialog = false;
    },
    getEvents(){

    },
    showRoute({ nativeEvent, event }) {
      console.log(nativeEvent);
      console.log(event);
    },
    },
    created () {
      bus.$emit('title', 'Planer');
    }
  }
</script>

<style lang="scss" scoped></style>
