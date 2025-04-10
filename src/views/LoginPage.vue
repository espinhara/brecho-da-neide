<template>
  <v-container max-width="xs">
    <v-card class="mt-8 pa-4" elevation="3">
      <h1 class="text-h5 text-center">Login</h1>
      <form @submit.prevent="handleLogin" class="mt-4">
        <LoginFields v-model="form" :errors="errors" :touched="touched" />
        <v-row>
          <v-col>
            <v-btn type="submit" color="primary" block class="mt-3"
              >Entrar</v-btn
            >
          </v-col>
        </v-row>
      </form>
      <v-row justify="center" class="mt-2">
        <v-col cols="auto">
          <v-btn text @click="handleRegister">Registre-se</v-btn>
          <span>|</span>
          <v-btn text @click="handleViewProducts">Ver Produtos</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { VContainer, VCard, VRow, VCol, VBtn } from "vuetify/components";
import LoginFields from "../components/LoginFields.vue";
import { api } from "../providers/api";
import { useAuthStore } from "../stores/auth"; // Importe o store
import { LoginValues } from "../@types/login";

export default defineComponent({
  name: "LoginPage",
  components: { VContainer, VCard, VRow, VCol, VBtn, LoginFields },
  setup() {
    const router = useRouter();
    const form = ref<LoginValues>({ email: "", password: "" });
    const errors = ref({ email: "", password: "" });
    const touched = ref({ email: false, password: false });
    const authStore = useAuthStore(); // Instancia o store

    const validate = () => {
      const newErrors = { email: "", password: "" };
      if (!form.value.email) newErrors.email = "E-mail é obrigatório";
      else if (!/\S+@\S+\.\S+/.test(form.value.email))
        newErrors.email = "E-mail inválido";
      if (!form.value.password) newErrors.password = "Senha é obrigatória";
      else if (form.value.password.length < 6)
        newErrors.password = "A senha deve ter pelo menos 6 caracteres";
      errors.value = newErrors;
      return !newErrors.email && !newErrors.password;
    };

    const handleLogin = async () => {
      touched.value = { email: true, password: true };
      if (!validate()) return;

      const success = await authStore.loginUser(form.value);
      if (success) {
        console.log("Login bem-sucedido:", authStore.user);
        if (authStore.user?.userType === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        console.error("Erro no login");
      }
    };

    const handleViewProducts = () => {
      router.push("/");
    };

    const handleRegister = () => {
      router.push("/register");
    };

    return {
      form,
      errors,
      touched,
      handleLogin,
      handleViewProducts,
      handleRegister,
    };
  },
});
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>