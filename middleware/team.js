import { useUserStore } from "../stores/auth";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // TODO: make safe :) rm -rf /hacker(wo)man
  if (process.client) {
    const authStore = useUserStore();
    if (authStore.role === null) {
      return navigateTo({ path: "/login" });
    }
    if (authStore.role !== "Team Coordinator") {
      return navigateTo({ path: "/" });
    }
  }
});
