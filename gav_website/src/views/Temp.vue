<template>
  <div>
    <v-app-bar dark flat dense>
      <router-link exact to="/">
        <v-img
          alt="Get Around Vienna Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.svg"
          transition="fab-transition"
          width="35"
          style="cursor: pointer"
        />
      </router-link>
    </v-app-bar>
    <v-container class="d-flex flex-column align-center" style="height: 90vh">
      <div class="text-h3 mt-16 mb-4 text-center">Sorry</div>
      <div class="text-h5 mb-4 text-center">Die Applikation ist noch in Entwicklung!</div>
      <v-btn class="primary" rounded to="/" exact>Zurück</v-btn>
    </v-container>
  </div>
</template>
