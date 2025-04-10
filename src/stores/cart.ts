// src/stores/cart.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CartItem, CartState } from '../@types/cart';

// Função para carregar o carrinho do localStorage
const loadCartFromStorage = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? (JSON.parse(cart) as CartItem[]) : [];
};

// Função para calcular o totalAmount inicial
const loadTotalAmountFromStorage = (): number => {
  const cart = loadCartFromStorage();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Definir a store
export const useCartStore = defineStore('cart', () => {
  // Estado reativo
  const items = ref<CartItem[]>(loadCartFromStorage());
  const totalAmount = ref<number>(loadTotalAmountFromStorage());
  const totalQuantity = ref<number>(loadCartFromStorage().reduce((total, item) => total + item.quantity, 0));

  // Ações (equivalentes aos reducers)
  function addItemToCart(newItem: CartItem) {
    const existingItem = items.value.find(item => item.id === newItem.id);

    if (existingItem && existingItem.quantity + 1 > existingItem.stock) {
      alert('Quantidade excede o estoque disponível!');
      return;
    }
    if (newItem.quantity + 1 > newItem.stock) {
      alert('Quantidade excede o estoque disponível!');
      return;
    }

    if (existingItem) {
      existingItem.quantity++;
      // No Redux, o preço não era ajustado corretamente; aqui mantemos a lógica consistente
      totalAmount.value += newItem.price;
    } else {
      items.value.push({
        ...newItem,
        stock: newItem.stock,
        quantity: 1,
      });
      totalAmount.value += newItem.price;
    }
    totalQuantity.value++;
    localStorage.setItem('cart', JSON.stringify(items.value));
  }

  function updateItemQuantity(payload: { id: string; quantity: number }) {
    const item = items.value.find(item => item.id === payload.id);
    if (item) {
      const oldQuantity = item.quantity;
      item.quantity = payload.quantity;
      totalAmount.value += (payload.quantity - oldQuantity) * (item.price / oldQuantity);
      totalQuantity.value += payload.quantity - oldQuantity;
      localStorage.setItem('cart', JSON.stringify(items.value));
    }
  }

  function removeItemFromCart(id: string) {
    const existingItem = items.value.find(item => item.id === id);
    if (existingItem) {
      totalQuantity.value--;
      totalAmount.value -= existingItem.price / existingItem.quantity;

      if (existingItem.quantity === 1) {
        items.value = items.value.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        // Ajuste no preço para refletir a quantidade reduzida
        existingItem.price -= existingItem.price / (existingItem.quantity + 1);
      }
      localStorage.setItem('cart', JSON.stringify(items.value));
    }
  }

  function removeItemsFromCart(id: string) {
    const existingItem = items.value.find(item => item.id === id);
    if (existingItem) {
      totalQuantity.value -= existingItem.quantity;
      totalAmount.value -= existingItem.price;
      items.value = items.value.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(items.value));
    }
  }

  function clearCart() {
    items.value = [];
    totalAmount.value = 0;
    totalQuantity.value = 0;
    localStorage.removeItem('cart');
  }

  // Retorna o estado e as ações
  return {
    items,
    totalAmount,
    totalQuantity,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    removeItemsFromCart,
    clearCart,
  };
});