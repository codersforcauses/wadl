import { useUserStore } from "../stores/user";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // NOTE: Nuxt 3.0.0 does not support server side access to client state
  // If you are seeing this further down the line, refactor this funciton
  // to run server side for better security.
  if (process.server) {
    const userStore = await useUserStore();
    if (userStore.role !== "Admin") {
      return navigateTo({ path: "/" });
    }
  }
});
