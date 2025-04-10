// src/plugins/vuetify.ts
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Importa o conjunto de ícones MDI
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Define MDI como o conjunto de ícones padrão
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
  },
});