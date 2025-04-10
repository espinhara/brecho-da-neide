import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);

  async function fetchProducts() {
    const response = await fetch('api/products');
    const data: Product[] = await response.json();
    products.value = data;
  }

  return {
    products,
    fetchProducts,
  };
});