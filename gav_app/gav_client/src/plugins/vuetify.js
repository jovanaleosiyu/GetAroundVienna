import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        elevation0: '#FFFFFF',
        accent: '#393939',
      },
      dark: {
        elevation0: '#040404',
        elevation1: '#1C1C1C',
        elevation2: '#414141',
        accent: '#393939',
      },
    },
  },
});
