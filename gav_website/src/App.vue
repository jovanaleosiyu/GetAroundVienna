<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed dense dark flat elevate-on-scroll color="transparent">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="scale-transition"
          width="35"
        />
      </div>
      <!-- <v-toolbar-title>Get Around - Vienna</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn plain>Idee</v-btn>
      <v-btn plain>Features</v-btn>
      <v-btn plain>Über uns</v-btn>
      <v-btn plain>Kontakt</v-btn>
      <v-btn elevation="2" rounded>
        Zur App
      </v-btn>
    </v-app-bar>
    <!-- Main -->
    <v-main>
      <StartSection />
    </v-main>
  </v-app>
</template>

<script>
import StartSection from "./components/StartSection.vue";
export default {
  name: "App",
  components: {
    StartSection
  },
  data: () => ({
    //
  })
};
</script>
