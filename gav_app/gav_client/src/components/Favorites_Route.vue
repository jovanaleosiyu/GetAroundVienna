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
            <v-menu offset-y>
              <template v-slot:activator="{ attrs, on }">
                <v-btn large icon :class="iconcolor" v-bind="attrs" v-on="on">
                  <v-icon color="white">mdi-{{ iconimage }}</v-icon>
                </v-btn>
              </template>
              <div>
                <v-btn
                  icon
                  small
                  v-for="col in colors"
                  :class="col"
                  :key="col"
                  @click="iconcolor = col"
                ></v-btn>
              </div>
              <v-divider></v-divider>
              <div>
                <v-btn
                  v-for="icon in icons"
                  :class="icon"
                  :key="icon"
                  @click="iconimage = icon"
                >
                  <v-icon large color="black">mdi-{{ icon }}</v-icon>
                </v-btn>
              </div>
            </v-menu>
          </v-col>
          <v-col cols="10">
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
      colors: [
        'red darken-1',
        'purple darken-1',
        'orange darken-1',
        'green darken-1',
        'cyan darken-1',
        'deep-orange darken-3',
      ],
      icons: ['home', 'work', 'school', 'tree', 'cafe', 'food', 'gym', 'shop'],
      iconcolor: '',
      iconimage: '',
    };
  },
  created() {
    this.iconcolor = this.colors[0];
    this.iconimage = this.icons[0];
  },
};
</script>

<style>
.favspace {
  width: 15%;
}
</style>
