import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import AuthView from "../pages/auth/AuthView.vue";
const StocksView = () => import("../pages/StocksView.vue");
const ItemsView = () => import("../pages/ItemsView.vue");
const ItemsListing = () => import("../pages/items/ItemsListing.vue");
const ItemsReception = () => import("../pages/items/ItemsReception.vue");
const CommandsView = () => import("../pages/CommandsView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    alias: "/home",
    component: HomePage,
  },
  {
    path: "/authentification",
    name: "Auth",
    alias: "/auth",
    component: AuthView,
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: StocksView,
  },
  {
    path: "/items",
    name: "Items",
    component: ItemsView,
    meta: {
      hasMenu: true,
      menuChildren: [
        {
          icon: "wrench",
          name: "Réglage",
          path: "/items",
        },
        {
          icon: "basket-plus",
          name: "Réception",
          path: "/items/reception",
        },
      ],
    },
    children: [
      {
        name: "Items",
        path: "",
        component: ItemsListing,
      },
      {
        name: "Reception",
        path: "reception",
        component: ItemsReception,
      },
    ],
  },
  {
    path: "/commands",
    name: "Commands",
    component: CommandsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
