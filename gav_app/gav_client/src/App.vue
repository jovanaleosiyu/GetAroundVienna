<template>
  <v-app>
    <v-app-bar app class="elevation0" height="70" v-if="showappbar">
      <v-app-bar-nav-icon
        absolute
        @click="drawer = true"
        class="d-lg-none"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ $route.name }} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-if="showappbar"
      class="elevation1"
      v-model="drawer"
      app
    >
      <svg
        class="logo ma-5"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 500 500"
        xml:space="preserve"
      >
        <path
          d="M500,0C463.7,123.6,280.1,233,0,239.2V500C280.1,471.7,475.4,297,500,0z M342.1,239.8c-58.4,99.6-163.3,148.7-270,161.9
	v-81.4C174.6,317.5,302.5,273.2,342.1,239.8z"
          :fill="'#FFF'"
        />
      </svg>
      <div class="pl-4">
        <v-icon class="mr-7">mdi-account-outline</v-icon>
        <span v-if="userId != null">{{ email }}</span>
        <span v-else>Gast</span>
      </div>
      <v-divider class="mt-5 mb-1"></v-divider>
      <v-list nav>
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
    <v-main>
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
    drawer: null,
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
<style>
.logo {
  max-width: 40px;
  max-height: 40px;
}
</style>
