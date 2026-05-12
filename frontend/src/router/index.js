import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProductPage from "../pages/ProductPage.vue";
import AdminRedirectPage from "../pages/AdminRedirectPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/products/:slug", name: "product", component: ProductPage },
    { path: "/admin", name: "admin", component: AdminRedirectPage },
    { path: "/admin/login", name: "admin-login", component: AdminRedirectPage },
  ],
});

export default router;
