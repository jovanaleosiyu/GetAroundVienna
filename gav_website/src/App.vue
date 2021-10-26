<template>
  <v-app>
    <router-view />
    <!-- Footer -->
    <v-footer dark padless>
      <v-card flat tile class="grey darken-4 text-center" style="width:100vw">
        <v-card-text class="text-body-1">
          Get Around - Vienna | Diplomarbeit an der
          <a
            href="https://www.htlwienwest.at"
            target="_blank"
            class="light-blue--text text--lighten-2 text-decoration-none"
            >HTL Wien West</a
          >
          (Informationstechnologie) | © 2021 - 2021 www.getaroundvienna.at - All Rights Reserved. |
          <router-link to="/impressum" class="light-blue--text text--lighten-2 text-decoration-none"
            >Impressum</router-link
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<style lang="scss">
.v-footer {
  margin-top: 10vh;
}
// Scrollbar
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b8b8b8;
}
</style>
