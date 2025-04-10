<!-- <template>
  <v-app>
    <v-main>
      <v-container v-if="loading">
        <LoadingApp />
      </v-container>
      <v-container v-else style="margin: 10px">
        <h1>Produtos em Destaque</h1>
        <ProductList
          :products="products"
          @update-products="setProducts"
          @update-loading="setLoading"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { VApp, VMain, VContainer } from "vuetify/components";
import ProductList from "./components/ProductList.vue";
import LoadingApp from "./components/Loading.vue";
import { Product } from "./@types/product";
import { api } from "./providers/api";

export default defineComponent({
  name: "App",
  components: { VApp, VMain, VContainer, ProductList, LoadingApp },
  setup() {
    const loading = ref(true);
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

    const setProducts = (newProducts: Product[]) => {
      products.value = newProducts;
    };

    const setLoading = (value: boolean) => {
      console.log("App setLoading chamado com:", value);
      loading.value = value;
    };

    return { loading, products, setProducts, setLoading };
  },
});
</script> -->

<!-- src/App.vue -->
<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
      <!-- Aqui é onde as rotas são renderizadas -->
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VApp, VMain } from "vuetify/components";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default defineComponent({
  name: "App",
  components: { VApp, VMain, Header, Footer },
});
</script>