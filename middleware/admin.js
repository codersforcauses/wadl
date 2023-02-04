import { useUserStore } from "../stores/user";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (process.server) {
    const userStore = await useUserStore();
    if (userStore.role !== "Admin") {
      return navigateTo({ path: "/" });
    }
  }
});
