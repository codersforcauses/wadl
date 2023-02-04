import { useUserStore } from "../stores/user";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (process.server) {
    const userStore = await useUserStore();
    if (userStore.requesting) {
      userStore.clearStore();
    }

    const publicRoutes = ["/", "/signup", "/login"];
    if (publicRoutes.includes(to.path)) return;

    if (userStore.auth === null) {
      return navigateTo({ path: "/login" });
    }
  }
});
