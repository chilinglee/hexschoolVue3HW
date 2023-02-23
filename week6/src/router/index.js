import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { isBackStage: false },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductView.vue"),
      meta: { isBackStage: false },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
      meta: { isBackStage: false },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { isBackStage: false },
    },
    {
      path: "/admin",
      name: "backstage",
      meta: { isBackStage: true },
      redirect: () => {
        return { path: "/admin/products" };
      },
      children: [
        {
          path: "products",
          component: () => import("../views/BackStageProductsView.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/OrdersView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
  scrollBehavior() {
    // return desired position
    return {
      top: 0,
    };
  },
});

export default router;
