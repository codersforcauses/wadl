import { useUserStore } from "../stores/user";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const userStore = await useUserStore();
  if (userStore.role !== "Team Coordinator") {
    return navigateTo({ path: "/" });
  }
});
