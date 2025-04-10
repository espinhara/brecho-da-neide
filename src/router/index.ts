import { createRouter, createWebHistory } from 'vue-router';
import ProductPurchasePage from '../views/ProductPurchasePage.vue'; // Crie este componente se necessário
import ProductList from '../components/ProductList.vue';
import LoginPage from '../views/LoginPage.vue';
// import CartPage from '../views/CartPage.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/product/:id', name: 'ProductPurchase', component: ProductPurchasePage },
  { path: '/login', name: 'Login', component: LoginPage },
  // { path: '/cart', name: 'Cart', component: CartPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});