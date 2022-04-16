<template>
  <v-container>
    <v-sheet class="mb-3 rounded-lg pa-3" width="300" height="100">
      E-Mail Adresse
    </v-sheet>
    <v-sheet class="mb-3 pa-3 rounded-lg">
      <h2 class="mb-3 font-weight-medium">Farbschema</h2>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        :label="`Dark Mode`"
      ></v-switch>
      <v-btn
        v-for="c in colors"
        :key="c.colors"
        icon
        :class="c.class"
        class="ma-1 inset-shadow"
        @click="selectTheme(c)"
      ></v-btn>
      <v-divider class="my-3"></v-divider>
      <h2 class="mb-3 font-weight-medium">Benachrichtigungen</h2>
    </v-sheet>
    Passwort zurücksetzen
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      //   darkmode: $vuetify.theme.dark,
      colors: [
        {
          class: 'grey darken-1',
          hex: '#757575',
        },
        {
          class: 'red darken-1',
          hex: '#E53935',
        },
        {
          class: 'blue darken-1',
          hex: '#1E88E5',
        },
        {
          class: 'green darken-1',
          hex: '#43A047',
        },
        {
          class: 'purple lighten-1',
          hex: '#AB47BC',
        },
        {
          class: 'brown darken-1',
          hex: '#6D4C41',
        },
        {
          class: 'cyan darken-1',
          hex: '#00ACC1',
        },
      ],
    };
  },
  methods: {
    selectTheme(color) {
      this.$vuetify.theme.themes.light.accent = color.hex;
      this.$vuetify.theme.themes.dark.accent = color.hex;
    },
  },
};
</script>

<style lang="scss" scoped>
.inset-shadow {
  -webkit-box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.16);
  box-shadow: inset 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}
</style>
