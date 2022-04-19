<template>
  <div class="home-wrapper">
    <!-- Map -->
    <Map
      class="home-map"
      :centerCurrPos="true"
      :class="{
        'home-map--fullscreen': widgetState === -1,
        'home-map--desktop': $vuetify.breakpoint.lgAndUp,
      }"
    />
    <!-- Wrapper -->
    <v-container
      fluid
      class="rounded-t-xl widget-wrapper pt-8"
      :class="
        $vuetify.breakpoint.lgAndUp
          ? 'widget-wrapper--desktop'
          : widgetStateClass
      "
    >
      <div class="scroll-wrapper">
        <!-- Draggable handle -->
        <div v-if="!$vuetify.breakpoint.lgAndUp" class="widget-handle mt-n7">
          <v-icon> mdi-drag-horizontal-variant </v-icon>
        </div>
        <!-- Widgets -->
        <v-expansion-panels flat multiple v-model="panels">
          <v-expansion-panel
            v-for="(w, i) of visible"
            :key="w.compName"
            class="rounded-xl"
            :class="`order-${w.order} ${
              i === 0 && panels.includes(0) ? 'mt-4' : '' // if first and open
            }`"
          >
            <v-expansion-panel-header class="font-weight-regular">
              <h2>{{ w.name }}</h2>
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
        <v-container>
          <!-- For padding -->
          <v-card-title> Reihenfolge verändern </v-card-title>
          <!-- Widgets -->
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
        </v-container>
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
import { Sortable, Draggable } from '@shopify/draggable';

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
    curPos: undefined,
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
    // Draggable widgets
    widgetState: 0, // -1 closed, 0 open, 1 fully opened
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
    calcOffset(offset) {
      return offset * 2 * 0.5;
    },
    translateMirror(mirror, mirrorCoords, containerRect) {
      if (
        mirrorCoords.top < containerRect.top ||
        mirrorCoords.left < containerRect.left
      ) {
        return;
      }
      requestAnimationFrame(() => {
        mirror.style.transform = `translate3d(${mirrorCoords.left}px, ${mirrorCoords.top}px, 0)`;
      });
    },
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
    widgetStateClass() {
      switch (this.widgetState) {
        case 1:
          return 'widget-wrapper--opened';
        case -1:
          return 'widget-wrapper--closed';
        default:
          return '';
      }
    },
  },
  mounted() {
    // Sortable
    this.sortable = new Sortable(document.querySelector('.list'), {
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
    this.sortable.on('sortable:stop', (ev) => {
      // Change new Order
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
    // Draggable
    const draggable = new Draggable(document.querySelector('.home-wrapper'), {
      draggable: '.widget-wrapper',
      handle: '.widget-handle',
      delay: 0,
      mirror: {
        constrainDimensions: true,
        xAxis: false,
        cursorOffsetY: 0,
      },
      classes: {
        'source:dragging': ['d-none'],
      },
    });
    let dragRect;
    let initialMouseY;
    let initialWidgetState;
    let dragThreshold;
    // --- Draggable events --- //
    // Get initial mouse Y pos
    draggable.on('drag:start', (evt) => {
      initialMouseY = evt.sensorEvent.clientY;
      initialWidgetState = this.widgetState;
    });
    // Get threshold
    draggable.on('mirror:created', (evt) => {
      dragRect = evt.source.getBoundingClientRect(); // .widget-wrapper
      dragThreshold = dragRect.height / 4;
    });
    // Check if over threshold and change state
    draggable.on('mirror:move', (evt) => {
      const offsetValue = initialMouseY - evt.sensorEvent.clientY;
      // console.log({
      //   dragThreshold,
      //   offsetValue,
      //   initialMouseY,
      // });
      if (Math.abs(offsetValue) > dragThreshold) {
        if (Math.abs(offsetValue) > dragThreshold * 4) {
          console.log();
        }
        if (initialWidgetState === 0) {
          this.widgetState = offsetValue < 0 ? -1 : 1;
        } else {
          this.widgetState = 0;
        }
      }
    });
  },
  created() {
    this.getWidgets();
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
  position: absolute;
  width: 100vw;
  height: 33%;
  z-index: 1;
  transition: height 0.5s linear;
}
.home-map--fullscreen {
  height: 100%;
}
.home-map--desktop {
  height: 100%;
  width: 60%;
  order: 1;
  position: relative;
}
.widget-handle {
  position: absolute;
  z-index: 10;
  width: 100%;
  text-align: center;
}
.widget-wrapper {
  position: absolute;
  top: 24.5%;
  z-index: 2;
  height: 74%;
}
.widget-wrapper--desktop {
  height: 100%;
  width: 40%;
  top: 0;
  order: 0;
  position: relative;
}
.widget-wrapper--closed {
  /* top: 95%; */
  top: 100%;
  margin-top: -32px;
}
.widget-wrapper--opened {
  top: 0%;
  height: 100%;
}
.scroll-wrapper {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.drag-track {
  width: 100%;
  height: 100%;
  /* position: absolute; */
}
.home-wrapper {
  display: flex;
  height: 100%;
  overflow: hidden;
}
</style>
