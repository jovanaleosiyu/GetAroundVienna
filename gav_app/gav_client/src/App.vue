<template>
  <v-app>
    <v-main>
      <v-app-bar
      color="gray"
      dark
      v-if="loggedIn"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="gray--text text--accent-4"
        >
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/route">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Route</v-list-item-title>
          </v-list-item>

          <v-list-item to="/favoriten">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Favoriten</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { bus } from "./main";
export default {
  name: "App",

  data: () => ({
      drawer: false,
      loggedIn: false,
    }),
    created () {
      bus.$on('loggedIn', (data) => {
        this.loggedIn = data;
      });
    },
};
</script>
