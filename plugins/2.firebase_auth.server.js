import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import admin from "firebase-admin";
import { UserBuilder } from "firebase-functions/v1/auth";
import { useUserStore } from "../stores/user";
  
  export default defineNuxtPlugin(async (nuxtApp) => {
    const { $serverFirestore, $serverAuth } = useNuxtApp();

    const userStore = await useUserStore();

    const token = await useCookie(`auth-token`);
    if (token.value) {
      try {
        const result = await $serverAuth.verifyIdToken(token.value);
        await userStore.setUser(result);
      } catch {
        // Not authenticated or invalid token
        // console.log("not authenticated")
      }
    };
  });
  