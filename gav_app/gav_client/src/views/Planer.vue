<template>
  <v-container>
    <v-sheet height="600" class="pa-4">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        type="month"
        event-overlap-mode="stack"
        color="primary"
      ></v-calendar>
    </v-sheet>
    <div class="flex-column pa-4">
      <div class="d-flex align-center">
      <h1>Routinen</h1>
      <v-spacer></v-spacer>
      <v-btn
          elevation="5"
          fab
          small
          class="grey lighten-3 black--text ml-3"
        >
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { bus } from '../main';
  export default {
    data: () => ({
      value: '',
    }),
    created () {
      bus.$emit('title', 'Planer');
    },
  }
</script>

<style lang="scss" scoped></style>
