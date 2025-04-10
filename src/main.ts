// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/index'; // Se estiver usando Vue Router

const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.use(router); // Opcional
app.mount('#app');