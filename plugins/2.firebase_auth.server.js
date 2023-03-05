import { defineNuxtPlugin, useNuxtApp, useCookie } from "#imports";
import { useUserStore } from "../stores/user";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $serverAuth } = useNuxtApp();

  const userStore = await useUserStore();

  // currently only checks cookie on page reload.
  // may cause minor issues if a user logs out on another tab

  const token = await useCookie(`auth-token`);
  if (token.value) {
    try {
      const result = await $serverAuth.verifyIdToken(token.value);
      if (result) {
        await userStore.setUser(result);
      } else {
        await userStore.clearStore();
      }
    } catch {
      // Not authenticated or invalid token
    }
  }
});
