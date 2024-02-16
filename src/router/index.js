import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/inventario",
          name: "inventario",
          component: () => import("@/views/inventario.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/set-to-zero/:idItem",
          name: "set-to-zero",
          component: () => import("@/views/set-to-zero.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/access",
      name: "access",
      component: () => import("@/views/auth/Access.vue"),
    },
    {
      path: "/access-denied",
      name: "access-denied",
      component: () => import("@/views/auth/AccessDenied.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/auth/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next({ name: "access" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
