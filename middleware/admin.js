import { useUserStore } from "../stores/auth";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // TODO: make safe :) rm -rf /hacker(wo)mans
  if (process.client) {
    const authStore = useUserStore();
    if (authStore.role !== "Admin") {
      return navigateTo({ path: "/login" });
    }
  }
});
