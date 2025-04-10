<template>
  <v-app-bar color="#5B1B64">
    <v-toolbar-title @click="goToHome(router)" class="pointer">
      <v-img :src="logo" alt="Logo" height="45" contain />
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon @click="handleCartOpen">
      <v-badge :content="itemCount" color="error" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
    <v-menu
      v-model="menuOpen"
      :close-on-content-click="true"
      offset-y
      transition="slide-y-transition"
    >
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="large" color="brown" src="/avatar.png">
            <span class="text-h5">
              {{
                getAcronym(user?.name, {
                  minWordLength: 2,
                  separator: "",
                  ignoreWords: ["de", "da", "a", "o"],
                })
              }}
            </span>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="user?.name" @click="handleClose">
          <v-list-item-title>Minha Conta</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="user?.name" @click="handleClose">
          <v-list-item-title>Favoritos</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogin">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="user?.name" @click="handleLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- Componente Carrinho -->
    <Cart
      v-if="cartOpen"
      :anchor-el="cartAnchorEl"
      :open="cartOpen"
      @close="handleCartClose"
    />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {
  VAppBar,
  VToolbarTitle,
  VSpacer,
  VBtn,
  VIcon,
  VBadge,
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VAvatar,
  VImg,
} from "vuetify/components";
import { useCartStore } from "../stores/cart";
import Cart from "./Cart.vue"; // Assumindo que existe
import logo from "../assets/images/logo.png";
import { User } from "../@types/user";
import { goToCartPage, goToHome } from "../utils/navigation";
import { AcronymOptions } from "../@types/acronym";

export default defineComponent({
  name: "Header",
  components: {
    VAppBar,
    VToolbarTitle,
    VSpacer,
    VBtn,
    VIcon,
    VBadge,
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VAvatar,
    VImg,
    Cart,
  },
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();

    const menuOpen = ref(false);
    const cartOpen = ref(false);
    const cartAnchorEl = ref<HTMLElement | null>(null);
    const user = ref<User | null>(null);

    const items = computed(() => cartStore.items);
    const itemCount = computed(() =>
      items.value.reduce((total, item) => total + item.quantity, 0)
    );

    function getAcronym(text: string, options: AcronymOptions = {}): string {
      const { minWordLength = 1, separator = "", ignoreWords = [] } = options;

      if (!text || typeof text !== "string") return "US";

      return text
        .split(/\s+/)
        .filter(
          (word) =>
            word.length >= minWordLength &&
            !ignoreWords.includes(word.toLowerCase())
        )
        .map((word) => word[0])
        .join(separator)
        .toUpperCase();
    }

    onMounted(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser && !user.value) {
        console.log("Usuário carregado:", JSON.parse(storedUser));
        user.value = JSON.parse(storedUser);
      }
    });

    const handleMenu = () => {
      menuOpen.value = true;
    };

    const handleClose = () => {
      menuOpen.value = false;
    };

    const handleLogin = () => {
      handleClose();
      router.push("/login");
    };

    const handleLogout = () => {
      handleClose();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.clear();
      router.push("/login");
    };

    const handleCartOpen = (event: MouseEvent) => {
      cartAnchorEl.value = event.currentTarget as HTMLElement;
      cartOpen.value = !cartOpen.value;
    };

    const handleCartClose = () => {
      cartOpen.value = false;
      cartAnchorEl.value = null;
    };

    return {
      logo,
      menuOpen,
      cartOpen,
      cartAnchorEl,
      user,
      itemCount,
      router,
      goToHome,
      goToCartPage,
      getAcronym,
      handleMenu,
      handleClose,
      handleLogin,
      handleLogout,
      handleCartOpen,
      handleCartClose,
    };
  },
});
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>