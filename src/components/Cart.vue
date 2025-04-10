<template>
  <v-menu
    v-model="open"
    :activator="anchorEl"
    :close-on-content-click="false"
    offset-y
    transition="slide-y-transition"
  >
    <v-card width="25ch">
      <v-list v-if="items.length > 0">
        <template v-for="(item, index) in items" :key="item.id">
          <v-list-item @click="goToCart">
            <v-list-item-title>{{
              item.name.substring(0, 14).padEnd(17, ".")
            }}</v-list-item-title>
            <v-list-item-subtitle
              >Quantidade: {{ item.quantity }}</v-list-item-subtitle
            >
            <template #append>
              <v-avatar size="36">
                <v-img :src="item.imageUrl" :alt="item.name" />
              </v-avatar>
            </template>
          </v-list-item>
          <v-divider v-if="index < items.length - 1" />
        </template>
      </v-list>
      <v-list v-else>
        <v-list-item>
          <v-list-item-title>Seu carrinho está vazio :/</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { useRouter } from "vue-router";
import {
  VMenu,
  VCard,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VDivider,
  VAvatar,
  VImg,
} from "vuetify/components";
import { useCartStore } from "../stores/cart";
import { CartItem } from "../@types/cart";

export default defineComponent({
  name: "Cart",
  components: {
    VMenu,
    VCard,
    VList,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VDivider,
    VAvatar,
    VImg,
  },
  props: {
    anchorEl: {
      type: [Object, null] as PropType<HTMLElement | null>,
      default: null,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const router = useRouter();
    const cartStore = useCartStore();

    const items = computed(() => cartStore.items);

    const goToCart = () => {
      emit("close");
      // router.push("/cart");
    };

    return {
      items,
      goToCart,
    };
  },
});
</script>

<style scoped>
.v-card {
  min-width: 25ch; /* Mantém a largura mínima como no original */
}
</style>