<template>
  <v-app>
    <v-main>
      <v-app-bar
      color="gray"
      dark
      v-if="loggedIn"
      class="pr-9"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
    <v-img src="./assets/GAV-logo.svg" max-height="40" max-width="40" class="ma-5"></v-img>
    <div class="pl-4">
      <v-icon class="mr-7">mdi-account-outline</v-icon>
      <span>bla@email.com</span>
    </div>
    <v-divider class="my-5"></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="gray--text text--accent-4"
        >
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/route">
            <v-list-item-icon>
              <v-icon>mdi-compass-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Route</v-list-item-title>
          </v-list-item>

          <v-list-item to="/favoriten">
            <v-list-item-icon>
              <v-icon>mdi-star-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Favoriten</v-list-item-title>
          </v-list-item>

          <v-list-item to="/planer">
            <v-list-item-icon>
              <v-icon>mdi-calendar-blank-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Planer</v-list-item-title>
          </v-list-item>

          <v-divider class="my-5"></v-divider>

          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Einstellungen</v-list-item-title>
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
import VueCookies from 'vue-cookies';
export default {
  name: "App",

  data: () => ({
      drawer: false,
      loggedIn: false,
      title: '',
    }),
    created () {
      bus.$on('loggedIn', (data) => {
        this.loggedIn = data;
      });
      this.loggedIn = VueCookies.get('loggedIn');
      bus.$data.userId = VueCookies.get('userId');
      bus.$data.loggedIn = VueCookies.get('loggedIn')
      bus.$on('title', (data) => {
        this.title = data
      })
      console.log('User eingellogt mit ID: ' + bus.$data.userId);
    },
};
</script>

