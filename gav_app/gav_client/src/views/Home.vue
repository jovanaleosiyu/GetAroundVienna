<template>
  <div class="home-wrapper">
    <!-- Map -->
    <Map class="home-map" />
    <!-- Widgets -->
    <v-container fluid class="rounded-t-xl bg widget-wrapper">
      <div class="scroll-wrapper">
        <v-expansion-panels flat multiple v-model="panels">
          <v-expansion-panel
            v-for="w of visible"
            :key="w.compName"
            class="rounded-xl"
            :class="`order-${w.order}`"
          >
            <v-expansion-panel-header class="text-h6 font-weight-regular">
              {{ w.name }}
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
          <v-spacer></v-spacer>
          <v-toolbar-title>Widgets</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="save">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Heading -->
        <v-card-title> Reihenfolge verändern </v-card-title>
        <!-- Widgets -->
        <!-- <v-divider></v-divider> -->
        <v-list class="list" dense>
          <v-list-item
            class="list-item"
            :class="`order-${w.order}`"
            v-for="w of visibleEdit"
            :key="w.name"
          >
            <v-btn @click="hide(w)" x-small icon color="error" class="mr-3">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-list-item-title>{{ w.name }}</v-list-item-title>
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-list-item>
        </v-list>
        <!-- Hidden widgets -->
        <v-divider></v-divider>
        <v-subheader>Ausgeblendete Elemente</v-subheader>
        <v-list dense>
          <v-list-item v-for="w of hiddenEdit" :key="w.name">
            <v-btn @click="show(w)" x-small icon color="success" class="mr-3">
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
import { bus } from '../main';
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
    editDialog: false,
    forceUpd: false,
  }),
  methods: {
    startEdit() {
      this.editDialog = true;
    },
    save() {
      for (let i in this.widgets)
        this.widgets[i].order = this.newOrder[i].order;
      this.forceUpd = !this.forceUpd;
      this.updWidgets(); // Save in database
      this.editDialog = false;
    },
    hide(w) {
      const roi = w.order; // order index of removed item
      let el; // this.newOrder[i].order
      for (let i in this.newOrder) {
        el = this.newOrder[i].order;
        if (el === -1) continue;
        else if (el === roi) this.newOrder[i].order = -1;
        else if (el > roi) this.newOrder[i].order--;
      }
    },
    show(w) {
      w.order = Math.max(...this.newOrder.map((m) => m.order)) + 1;
    },
    async getWidgets() {
      const { data } = await bus.$data.instance.get('/user/widgets');
      for (let i in data) {
        this.widgets[i].order = data[i];
      }
      this.newOrder = this.widgets.map((w) => ({
        name: w.name,
        order: w.order,
      }));
      this.forceUpd = !this.forceUpd;
    },
    updWidgets() {
      const orderlist = this.widgets.map((w) => w.order);
      bus.$data.instance.patch('/user/widgets', orderlist);
    },
  },
  created() {
    this.getWidgets();
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
      let el; // this.newOrder[i].order
      for (let i in this.newOrder) {
        el = this.newOrder[i].order;
        if (el === oldIx) this.newOrder[i].order = newIx;
        else if (
          el === -1 ||
          (el < oldIx && newIx > el) ||
          (oldIx < el && newIx < el)
        ) {
          continue;
        } else if (el <= newIx && el > oldIx) this.newOrder[i].order--;
        else this.newOrder[i].order++;
      }
    });
  },
  computed: {
    visible() {
      this.forceUpd;
      return this.widgets.filter((w) => w.order > -1);
    },
    hiddenEdit() {
      return this.newOrder.filter((no) => no.order <= -1);
    },
    visibleEdit() {
      return this.newOrder
        .filter((no) => no.order > -1)
        .sort((a, b) => a.order - b.order);
    },
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
