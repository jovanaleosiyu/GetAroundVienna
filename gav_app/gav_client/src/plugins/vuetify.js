import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        secondary: '#FFFFFF',
        accent: '#E53935',
        test: '#FFFFFF',
      },
      dark: {
        primary: '#472b29',
        elevation1: '#1C1C1C',
        elevation2: '#414141',
        accent: '#E53935',
        test: '#040404',
      },
    },
  },
});
