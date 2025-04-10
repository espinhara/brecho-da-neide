// src/utils/navigation.ts
import type { Router } from 'vue-router';

export const goToPurchasePage = (router: Router, productId: string) => {
  router.push({ name: 'ProductPurchase', params: { id: productId } });
};

export const goToCartPage = (router: Router) => {
  router.push({ name: 'Cart' })
}

export const goToHome = (router: Router) => {
  router.push("/");
};