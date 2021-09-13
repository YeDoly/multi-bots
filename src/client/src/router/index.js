import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import Home from "../views/Home.vue";
import Sidebar from "../views/Sidebar.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      sidebar: Sidebar,
    },
  },
  {
    path: "/:guild",
    name: "Guild",
    components: {
      default: Home,
      sidebar: Sidebar,
    },
  },
  {
    path: "/login/:id",
    redirect: (to) => {
      store.dispatch("setUser", to.params.id);
      return "/";
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
