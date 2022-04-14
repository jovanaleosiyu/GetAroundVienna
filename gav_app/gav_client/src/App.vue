<template>
  <v-app>
    <v-main>
      <!-- <v-app-bar color="white" v-if="loggedIn" class="pr-9"> -->
      <v-app-bar color="white" v-if="showappbar" class="pr-9">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ $route.name }} </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-img
          src="./assets/GAV-logo.svg"
          max-height="40"
          max-width="40"
          class="ma-5"
        ></v-img>
        <div class="pl-4">
          <v-icon class="mr-7">mdi-account-outline</v-icon>
          <span v-if="userId != null">{{ email }}</span>
          <span v-else>Gast</span>
        </div>
        <v-divider class="mt-5 mb-1"></v-divider>
        <v-list nav dense>
          <v-list-item-group active-class="gray--text text--accent-4">
            <v-list-item v-if="userId != null" to="/home">
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

            <v-list-item v-if="userId != null" to="/favoriten">
              <v-list-item-icon>
                <v-icon>mdi-star-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Favoriten</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userId != null" to="/planer">
              <v-list-item-icon>
                <v-icon>mdi-calendar-blank-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Planer</v-list-item-title>
            </v-list-item>

            <v-divider class="my-5"></v-divider>

            <v-list-item to="/settings">
              <v-list-item-icon>
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Einstellungen</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ userId ? 'Abmelden' : 'Anmelden' }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!-- <v-btn @click="logout" class="ml-1 pr-16" text><v-icon class="mr-7">mdi-logout</v-icon>Abmelden</v-btn> -->
      </v-navigation-drawer>

      <router-view @loadUser="loadUser" />
    </v-main>
  </v-app>
</template>

<script>
import { bus } from './main';
import VueCookies from 'vue-cookies';
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    loggedIn: false,
    title: '',
    email: '',
    userId: '',
  }),
  methods: {
    async getUser() {
      if (this.userId != null) {
        const { data } = await bus.$data.instance.get('/user');
        this.email = data.email;
      } else return;
    },
    async logout() {
      if (this.userId == null) {
        VueCookies.remove('loggedIn');
        VueCookies.remove('userId');
        VueCookies.remove('sid');
        this.$router.push({ name: 'Welcome' });
        window.location.reload();
      } else {
        await bus.$data.instance.get('/logout');
        VueCookies.remove('loggedIn');
        VueCookies.remove('userId');
        VueCookies.remove('sid');
        this.$router.push({ name: 'Welcome' });
        // window.location.reload();
      }
    },
    loadUser() {
      this.getUser();
      // this.$router.push({ name: 'Route' });
      // window.location.reload();
    },
  },
  created() {
    bus.$on('loggedIn', (data) => {
      this.loggedIn = data;
      this.userId = VueCookies.get('userId');
    });

    bus.$on('title', (data) => {
      this.title = data;
    });

    // this.loggedIn = VueCookies.get('loggedIn');
    bus.$data.userId = VueCookies.get('userId');
    bus.$data.loggedIn = VueCookies.get('loggedIn');

    this.userId = VueCookies.get('userId');
    this.getUser();
  },
  computed: {
    showappbar() {
      return !(
        this.$route.path == '/' ||
        this.$route.path == '/sign-up' ||
        this.$route.path == '/login'
      );
    },
  },
};
</script>
