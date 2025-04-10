<template>
  <v-container v-if="loading">
    <LoadingApp />
  </v-container>
  <div>
    <SearchInput
      :data="{ searchInput }"
      @search="onSearch"
      @update-loading="setLoading"
    />
    <v-row>
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard
          :id="product._id"
          :name="product.name"
          :price="product.price"
          :image-url="product?.imageUrls?.[0]"
          :quantity="product.quantity"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { VRow, VCol } from "vuetify/components";
import ProductCard from "./ProductCard.vue";
import SearchInput from "./SearchInput.vue";
import LoadingApp from "./Loading.vue";
import { Product } from "../@types/product";
import { api } from "../providers/api";

export default defineComponent({
  name: "ProductList",
  components: { VRow, VCol, ProductCard, LoadingApp, SearchInput },
  // props: {
  //   products: {
  //     type: Array as () => Product[],
  //     required: true,
  //   },
  //   setProducts: {
  //     type: Function as unknown as () => (products: Product[]) => void,
  //     required: true,
  //   },
  //   setLoading: {
  //     type: Function as unknown as () => (bool: boolean) => void,
  //     required: true,
  //   },
  // },
  setup(props, { emit }) {
    const loading = ref(true);
    const searchInput = ref<string>("");
    const products = ref<Product[]>([]);

    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        products.value = response.data;
        console.log(products.value);
        loading.value = false;
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        loading.value = false;
      }
    };

    onMounted(fetchProducts);

    const onSearch = (list: Product[]) => {
      products.value = list;
      emit("update-products", list);
    };

    return { searchInput, onSearch, products };
  },
});
</script>