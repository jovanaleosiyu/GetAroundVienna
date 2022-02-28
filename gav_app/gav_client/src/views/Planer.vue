<template>
  <v-container>
    <v-sheet height="600" class="pa-4">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        type="month"
        color="warning"
        event-overlap-mode="stack"
        :events="events"
      ></v-calendar>
    </v-sheet>
    <div class="flex-column pa-4">
      <div class="d-flex align-center">
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

              <v-divider class="mb-4"></v-divider>

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
            @click="dialog = false"
            class="my-2"
          >
          <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>
import { bus } from '../main';
  export default {
    data: () => ({
      value: '',
      events: [
        {
          name: 'test',
          start: '2022-02-28 12:00',
          end: '2022-02-28 12:30',
          color: 'red',
        },
        {
          name: 'ka',
          start: '2022-03-01 12:00',
          end: '2022-03-01 13:30',
          color: 'blue',
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
      color: '#000000'
    }),
    created () {
      bus.$emit('title', 'Planer');
    }
  }
</script>

<style lang="scss" scoped></style>
