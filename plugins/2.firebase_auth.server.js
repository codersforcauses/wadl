import { defineNuxtPlugin, useNuxtApp, useCookie } from "#imports";
import { useUserStore } from "../stores/user";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $serverAuth } = useNuxtApp();

  const userStore = await useUserStore();

  const token = await useCookie(`auth-token`);
  if (token.value) {
    try {
      const result = await $serverAuth.verifyIdToken(token.value);
      await userStore.setUser(result);
    } catch {
      await userStore.clearStore();
    }
  }
});
