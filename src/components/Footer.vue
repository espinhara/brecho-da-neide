<template>
  <v-footer
    color="#f7f7f7"
    class="pa-4 text-center"
    style="border-top: 1px solid #ddd"
  >
    <!-- Nome da Empresa -->
    <v-row justify="center">
      <v-col cols="auto">
        <h2 class="text-h6 mb-2">Brechó da Neide</h2>
      </v-col>
    </v-row>

    <!-- Redes Sociais e Contato -->
    <v-row justify="center" align="center" class="mb-2" style="gap: 16px">
      <!-- Instagram -->
      <v-col cols="auto">
        <v-btn
          icon
          href="https://www.instagram.com/neide.brecho_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon color="#E4405F">mdi-instagram</v-icon>
        </v-btn>
      </v-col>
      <!-- WhatsApp -->
      <v-col cols="auto">
        <v-btn
          icon
          href="https://wa.me/5511932337896"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon color="#25D366">mdi-whatsapp</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Localização -->
    <v-row justify="center" align="center" style="gap: 8px">
      <v-col cols="auto">
        <v-icon color="#555">mdi-map-marker</v-icon>
      </v-col>
      <v-col cols="auto">
        <p class="text-body-2 ma-0">
          Rua Hildebrando Firmino Lino da Costa, 97 - Jandira, SP
        </p>
      </v-col>
    </v-row>

    <!-- Direitos Autorais -->
    <v-row justify="center" class="mt-4">
      <v-col cols="auto">
        <p class="text-body-2 text-grey-darken-1 ma-0">
          © {{ currentYear }} Brechó da Neide. Todos os direitos reservados.
        </p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { VFooter, VRow, VCol, VBtn, VIcon } from "vuetify/components";

export default defineComponent({
  name: "Footer",
  components: { VFooter, VRow, VCol, VBtn, VIcon },
  setup() {
    const currentYear = computed(() => new Date().getFullYear());

    return { currentYear };
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>