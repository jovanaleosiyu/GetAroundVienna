<template>
  <v-container class="d-flex flex-column align-center">

      <v-card class="d-flex flex-column align-center" :outlined=true :min-width="$vuetify.breakpoint.mdAndUp ? 450 :'100%'" style="border: none">

      <v-form class="d-flex flex-column align-center" style="width: 100%">
        <div style="width: 80%">
        <v-text-field
        v-model="dep"
        label="Start"
        required
        ></v-text-field>

        <v-text-field
        v-model="des"
        label="Ziel"
        required
        ></v-text-field>
        </div>
        
        <v-btn elevation="5" @click="search()" fab class="align-self-end grey darken-3 white--text">
        <v-icon> mdi-magnify </v-icon>
      </v-btn>

      </v-form>

    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Route",
  data: () => ({
      dep: '',
      des: '',
  }),
};
</script>

<style scoped></style>
