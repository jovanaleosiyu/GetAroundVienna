<template>
  <v-container class="d-flex flex-column align-center">
    <v-card
      class="d-flex flex-column align-center"
      :outlined="true"
      :min-width="$vuetify.breakpoint.mdAndUp ? 450 : '100%'"
      style="border: none"
    >
      <v-form class="d-flex flex-column align-center" style="width: 100%">
        <div class="d-flex" style="width: 100%">
          <div style="width: 80%">
            <v-text-field
              v-model="depInput"
              @keyup.enter="getStopList('dep')"
              label="Start"
              required
            ></v-text-field>
            <v-list v-if="depList">
              <v-list-item
                v-for="el of depList"
                :key="el.name"
                @click="setStop('dep', el)"
              >
                <v-list-item-content>{{ el.name }}</v-list-item-content>
              </v-list-item>
            </v-list>

            <v-text-field
              v-model="desInput"
              @keyup.enter="getStopList('des')"
              label="Ziel"
              required
            ></v-text-field>
            <v-list v-if="desList">
              <v-list-item
                v-for="el of desList"
                :key="el.name"
                @click="setStop('des', el)"
              >
                <v-list-item-content>{{ el.name }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </div>

          <v-icon large class="my-auto pl-3 darkgrey--text" @click="swap()">
            mdi-swap-vertical
          </v-icon>
        </div>

        <div class="d-flex" style="width: 80%">
          <v-switch
            v-model="depArr"
            :label="depArr ? 'Ankunft' : 'Abfahrt'"
          ></v-switch>

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
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
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
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Datum Wählen"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>

          <v-btn
            elevation="5"
            @click="getTrip()"
            fab
            class="grey darken-3 white--text"
          >
            <v-icon> mdi-magnify </v-icon>
          </v-btn>
        </div>
      </v-form>

      <div class="list-group">
        <div v-for="(trip, i) of trips" :key="i" class="mb-3">
          <a
            class="list-group-item list-group-item-action"
            @click="trip.col = !trip.col"
          >
            <span class="badge rounded-pill bg-info">start-time: </span>
            {{ trip.steps[0].start.time }} <br />
            <span class="badge rounded-pill bg-info">end-time: </span>
            {{ trip.steps[trip.steps.length - 1].end.time }} <br />
            <span class="badge rounded-pill bg-success">duration: </span>
            {{ trip.duration }} <br />
            <span class="badge rounded-pill bg-warning">interchange: </span>
            {{ trip.interchange }}
          </a>
          <div v-if="trip.col" class="card card-body">
            <ul class="list-group">
              <li
                v-for="(step, j) of trip.steps"
                :key="j"
                class="list-group-item"
              >
                <strong>
                  {{ step.mode.name ? step.mode.name : step.mode.type }}
                </strong>
                <br />
                <span class="badge rounded-pill bg-info">
                  {{ step.start.time }}
                </span>
                {{ step.start.name }} <br />
                <span class="badge rounded-pill bg-info">
                  {{ step.end.time }}
                </span>
                {{ step.end.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Route',
  data: () => ({
    dep: '',
    depInput: undefined,
    depList: undefined,

    des: '',
    desInput: undefined,
    desList: undefined,

    depArr: false,

    time: undefined,
    menu1: false,

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu2: false,

    trips: [],
  }),
  methods: {
    async getStopList(depdes) {
      if (depdes == 'dep') {
        const { data } = await axios.get(
          `http://localhost:3000/points/${this.depInput}`
        );
        if (data instanceof Array) {
          this.depList = data;
        } else {
          this.depList = [data];
        }
      }
      if (depdes == 'des') {
        const { data } = await axios.get(
          `http://localhost:3000/points/${this.desInput}`
        );
        if (data instanceof Array) {
          this.desList = data;
        } else {
          this.desList = [data];
        }
      }
    },
    setStop(depdes, el) {
      if ('dep' === depdes) {
        this.dep = {
          ref: el.ref,
          type: el.type,
        };
        this.depInput = el.name;
        this.depList = undefined;
      }
      if ('des' === depdes) {
        this.des = {
          ref: el.ref,
          type: el.type,
        };
        this.desInput = el.name;
        this.desList = undefined;
      }
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
      };
      console.log(params);
      const { data } = await axios.get('http://localhost:3000/trip', {
        params,
      });
      console.log(data);
      this.trips = [];
      this.trips = data.map((d) => ({
        ...d,
        col: false,
      }));
    },
    swap() {
      let holdInput = this.depInput;
      this.depInput = this.desInput;
      this.desInput = holdInput;
      let hold = this.dep;
      this.dep = this.des;
      this.des = hold;
    },
  },
};
</script>

<style scoped></style>
