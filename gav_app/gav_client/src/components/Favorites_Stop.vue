<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon x-large elevation="3" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6"> Favorit erstellen </v-card-title>
      <v-container class="justify-center" width="50">
        <v-row align="center" justify="center">
          <v-col cols="12" align="center">
            <v-btn large icon class="black justify-center">
              <v-icon color="white">mdi-star</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10">
            <!-- <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              :rules="emailRules"
              label="Adresse"
              required
            ></v-text-field> -->
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>
        <v-btn icon large class="grey darken-3" @click="dialog = false">
          <v-icon color="white">mdi-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
