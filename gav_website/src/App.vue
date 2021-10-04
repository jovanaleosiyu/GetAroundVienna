<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed dense dark flat elevate-on-scroll color="transparent">
      <div class="d-flex align-center">
        <v-img
          alt="Get Around Vienna Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="fab-transition"
          width="35"
        />
      </div>
      <!-- <v-toolbar-title>Get Around - Vienna</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn plain>Features</v-btn>
      <v-btn plain>Über uns</v-btn>
      <v-btn plain>Kontakt</v-btn>
      <v-btn elevation="2" rounded>
        Zu der App
      </v-btn>
    </v-app-bar>
    <!-- Main -->
    <v-main>
      <!-- Start -->
      <StartSection />
      <!-- Features -->
      <section class="features">
        <v-row align="center" class="wrapper">
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-h2 white--text">
              Die <span class="pink--text lighten-2">Get Around - Vienna</span> App erleichtert dir
              den Transport quer durch Wien
            </div>
            <div class="w-75 text-h5 grey--text lighten-4">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum.
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <v-img class="mr-12" contain src="/img/phone-mockup.png"></v-img>
          </v-col>
        </v-row>
      </section>
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

<style lang="css">
.features .wrapper {
  background-color: #3c3c3b;
  width: 100vw;
  height: 100vh;
}
.w-75 {
  width: 75%;
}
</style>
