import { useUserStore } from "../stores/auth";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const userStore = await useUserStore();
    console.log(from);
    const notAuthed = userStore.firstName !== null && !userStore.authenticated;
    if (
      notAuthed &&
      from.matched[0].name !== "auth-id" &&
      to.matched[0].name !== "auth-id"
    ) {
      return navigateTo({ path: "/auth-" });
    }
  }
});
