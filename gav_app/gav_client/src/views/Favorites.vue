<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-card-title>Favoriten</v-card-title>
    <v-card-subtitle class="my-1">Haltestellen</v-card-subtitle>
    <v-list class="d-flex flex-row">
      <v-list-item>
        <div class="text-center">
          <v-btn icon elevation="3" large class="red">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <p class="my-2">Home</p>
        </div>
      </v-list-item>
      <v-list-item>
        <div class="text-center">
          <v-btn icon large elevation="3">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
    <v-card-subtitle>Routen</v-card-subtitle>
    <v-list class="d-flex flex-row">
      <v-list-item>
        <div class="text-center">
          <v-btn icon elevation="3" large class="red">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <p>Home</p>
        </div>
      </v-list-item>
      <v-list-item>
        <div class="text-center">
          <v-btn icon large elevation="3">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
