import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import store from "./store";

import Home from "./views/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { theme: "green" },
  },
  {
    path: "/ctfs",
    name: "CTFs",
    component: () => import("./views/CTFsPage.vue"),
    meta: { theme: "purple" },
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("./views/EventsComboPage.vue"),
    meta: { theme: "blue" },
  },
  {
    path: "/constitution",
    name: "Constitution",
    component: () => import("./views/ConstitutionPage.vue"),
    meta: { theme: "silver" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("./views/AccountPage.vue"),
    meta: { theme: "purple", requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./views/AboutPage.vue"),
    meta: { theme: "navy-neutral" },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./views/RegisterPage.vue"),
    meta: { theme: "purple" },
  },
  {
    path: "/forgot",
    name: "Forgot Password",
    component: () => import("./views/ForgotPasswordPage.vue"),
    meta: { theme: "navy" },
  },
  {
    path: "/resetpassword",
    name: "Reset Password",
    component: () => import("./views/ResetPasswordPage.vue"),
    meta: { theme: "navy" },
  },
  {
    path: "/confirm",
    name: "Confirm",
    component: () => import("./views/ConfirmPage.vue"),
    meta: { theme: "purple" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page not found",
    component: () => import("./views/404Page.vue"),
    meta: { theme: "blue" },
  },
];

const router = createRouter({
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  nextTick(() => {
    document.title = to.name + " - AdelaideB9" || "AdelaideB9";
  });

  if (from.name == null) {
    store.commit("updatePageTheme", to.meta.theme);
    if (store.state.auth.isLoggedIn) {
      store.dispatch("auth/refreshSession").then(() => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
          if (!store.state.auth.isLoggedIn) {
            next("/");
          } else {
            next();
          }
        } else {
          next();
        }
      });
      return;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
