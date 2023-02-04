import { useUserStore } from "../stores/user";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Running on client only to prevent routing conflicts -- admin
  // route and log in route conflicting. Important routes are still protected.
  if (process.client) {
    const userStore = await useUserStore();
    if (userStore.requesting) {
      await userStore.clearStore();
    }

    const publicRoutes = ["/", "/signup", "/login"];
    if (publicRoutes.includes(to.path)) return;

    if (userStore.auth === null) {
      return navigateTo({ path: "/login" });
    }
  }
});
