import { useUserStore } from "../stores/auth";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const authStore = await useUserStore();

    if (authStore.role === null) {
      return;
    }
    return navigateTo({ path: "/" });
  }
});
