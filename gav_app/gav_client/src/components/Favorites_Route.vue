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
            <!-- später v-for mit farben im array durchrennen lassen -->
            <div>
              <v-btn icon small class="red"></v-btn>
              <v-btn icon small class="blue"></v-btn>
              <v-btn icon small class="green"></v-btn>
              <v-btn icon small class="purple"></v-btn>
              <v-btn icon small class="brown"></v-btn>
              <v-btn icon small class="cyan"></v-btn>
            </div>
            <div>
              <v-btn>
                <v-icon large color="black">mdi-home</v-icon>
              </v-btn>
              <v-btn>
                <v-icon large color="black">mdi-home</v-icon>
              </v-btn>
            </div>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              :rules="emailRules"
              label="Start"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              :rules="emailRules"
              label="Ziel"
              required
            ></v-text-field>
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

<style>
.favspace {
  width: 15%;
}
</style>
