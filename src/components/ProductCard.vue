<template>
  <v-card height="500">
    <v-img :src="imageUrl" height="300" :alt="name" />
    <v-card-text>
      <h5 class="text-h5">{{ name }}</h5>
      <p class="text-body-2 text-grey-darken-1">R${{ price }}</p>
      <v-btn color="primary" @click="handleAddToCart">
        Adicionar
        <v-icon class="ml-2" right>mdi-cart</v-icon>
      </v-btn>
      <v-btn class="ml-2" color="success" @click="goToPurchasePage(router, id)"
        >Comprar</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { mdiCart } from "@mdi/js";
import { defineComponent } from "vue";
import { VCard, VImg, VCardText, VBtn, VIcon } from "vuetify/components";
import { useCartStore } from "../stores/cart";
import { goToPurchasePage } from "../utils/navigation";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProductCard",
  components: { VCard, VImg, VCardText, VBtn, VIcon },
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  data: () => ({
    mdiCart,
  }),
  setup(props) {
    const cartStore = useCartStore();
    const router = useRouter();

    const handleAddToCart = () => {
      cartStore.addItemToCart({
        id: props.id,
        name: props.name,
        price: props.price,
        imageUrl: props.imageUrl,
        quantity: 0,
        stock: props.quantity,
      });
    };

    return { handleAddToCart, goToPurchasePage, router };
  },
});
</script>