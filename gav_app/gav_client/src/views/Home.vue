<template>
  <div class="home-wrapper">
    <!-- Map -->
    <Map class="home-map" />
    <!-- Widgets -->
    <v-container fluid class="rounded-t-xl bg widget-wrapper">
      <div class="scroll-wrapper">
        <v-expansion-panels flat multiple v-model="panels">
          <v-expansion-panel
            v-for="w of widgets"
            :key="w.compName"
            class="rounded-xl"
            :class="`order-${w.order}`"
          >
            <v-expansion-panel-header class="text-h6">
              {{ w.compName }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <component :is="w.compName" v-bind="{ ...w.props }"></component>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- Edit button -->
        <v-btn class="my-3" rounded small @click="startEdit">Edit</v-btn>
      </div>
    </v-container>
    <!-- Edit dialog -->
    <v-dialog
      v-model="editDialog"
      eager
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Toolbar -->
        <v-toolbar dense>
          <v-btn icon @click="editDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Home Personaliseren</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text color="primary" @click="save"> Speichern </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Information -->
        <v-card class="ma-3" outlined>
          <v-subheader>Reihenfolge verändern</v-subheader>
          <v-card-text>
            Ändere die Reihenfolge der verschiedenen Komponente auf der
            Startseite per Drag and Drop.
          </v-card-text>
          <v-subheader>Ein- und Ausblenden</v-subheader>
          <v-card-text>
            Klicke auf den Button links, um Komponenten auszublenden. Unter
            <span class="font-italic"> Ausgeblendete Elemente </span>
            können sie wieder eingeblendet werden.
          </v-card-text>
        </v-card>

        <!-- Widgets -->
        <!-- <v-divider></v-divider> -->
        <v-list class="list" dense>
          <v-list-item class="list-item" v-for="w of widgets" :key="w.compName">
            <v-btn x-small icon color="error" class="mr-3">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-list-item-title>{{ w.name }}</v-list-item-title>
            <v-icon>mdi-drag</v-icon>
            <!-- <v-icon>mdi-drag-horizontal-variant</v-icon> -->
          </v-list-item>
        </v-list>
        <!-- Hidden widgets -->
        <v-divider></v-divider>
        <v-subheader>Ausgeblendete Elemente</v-subheader>
        <v-list dense>
          <v-list-item v-for="w of widgets" :key="w.compName">
            <v-btn x-small icon color="success" class="mr-3">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-list-item-title>{{ w.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { bus } from '../main';
import FavWidget from '../components/FavWidget.vue';
import RouteWidget from '../components/RouteWidget.vue';
import PlanerWidget from '../components/PlanerWidget.vue';
import MonitorWidget from '../components/MonitorWidget.vue';
import Map from '../components/Map';
import { Sortable } from '@shopify/draggable';

import SwapAnimation from '@shopify/draggable/lib/plugins/swap-animation';

export default {
  name: 'Home',
  components: {
    Map,
    FavWidget,
    RouteWidget,
    PlanerWidget,
    MonitorWidget,
  },
  data: () => ({
    panels: [0, 1, 2, 3],
    widgets: [
      {
        name: 'Route',
        compName: 'RouteWidget',
        props: {},
      },
      {
        name: 'Favoriten',
        compName: 'FavWidget',
        props: { actions: false },
      },
      {
        name: 'Planer',
        compName: 'PlanerWidget',
        props: {},
      },
      {
        name: 'Monitor',
        compName: 'MonitorWidget',
        props: {},
      },
    ],
    sortable: undefined,
    newOrder: [],
    editDialog: true,
  }),
  methods: {
    startEdit() {
      this.editDialog = true;
    },
    save() {
      for (let i in this.widgets) this.widgets[i].order = this.newOrder[i];
      this.editDialog = false;
    },
  },
  created() {
    // TODO fetch order from database
    for (let i in this.widgets) {
      this.widgets[i].order = Number(i);
      this.newOrder.push(Number(i));
      // hidden
    }
  },
  mounted() {
    this.sortable = new Sortable(document.querySelectorAll('.list'), {
      draggable: '.list-item',
      mirror: {
        constrainDimensions: true,
        xAxis: false,
      },
      classes: {
        mirror: ['d-m'],
        'source:dragging': ['d-sd'],
      },
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      },
      plugins: [SwapAnimation],
    });
    // Change new order
    this.sortable.on('sortable:stop', (ev) => {
      const oldIx = ev.oldIndex;
      const newIx = ev.newIndex;
      let el; // this.newOrder[i]
      for (let i in this.newOrder) {
        el = this.newOrder[i];
        if (el === oldIx) this.newOrder[i] = newIx;
        else if ((el < oldIx && newIx > el) || (oldIx < el && newIx < el)) {
          continue;
        } else if (el <= newIx && el > oldIx) this.newOrder[i]--;
        else this.newOrder[i]++;
      }
    });
  },
};
</script>

<style>
/* Draggable */
.d-sd {
  background-color: #eee !important;
  opacity: 0.5;
}
.d-m {
  /* background-color: #ff0 !important; */
  /* opacity: 0.5; */
  background-color: #fff;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}
.list-item {
  cursor: move;
}
/* Other */
.home-map {
  width: 100vw;
  height: 33%;
  z-index: 1;
}

.widget-wrapper {
  z-index: 5;
  margin-top: -7%;
  height: 74%;
}

.scroll-wrapper {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bg {
  background-color: #fcfcfc;
  /* background-color: #efefef; */
}
</style>
