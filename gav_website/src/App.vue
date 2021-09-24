<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed dense dark flat elevate-on-scroll color="transparent">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title>Get Around - Vienna</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn plain>Idee</v-btn>
      <v-btn plain>Features</v-btn>
      <v-btn plain>Über uns</v-btn>
      <v-btn plain>Kontakt</v-btn>
      <v-btn color="primary" elevation="2" rounded>
        Zur App
      </v-btn>
    </v-app-bar>
    <!-- Main -->
    <v-main>
      <!-- Temporary start, placeholder for animation! -->
      <div>
        <v-img :aspect-ratio="16 / 9" src="/img/placeholder_start.jpg"></v-img>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
