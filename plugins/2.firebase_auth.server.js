import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import admin from "firebase-admin";
import { UserBuilder } from "firebase-functions/v1/auth";
import { useUserStore } from "../stores/user";
  
  export default defineNuxtPlugin(async (nuxtApp) => {
    const { $serverFirestore, $serverAuth } = useNuxtApp();

    const userStore = useUserStore();

    const token = await useCookie(`auth-token`)
    
    if (token.value) {
      try {
        const result = await $serverAuth.verifyIdToken(token.value);
        console.log("setting User...");
        await userStore.setUser(result);
        console.log("authed")
        console.log(userStore.email)
      } catch {
      //   // Not authenticated or invalid token
      //   console.log("not authed?")
      }
    };
    // console.log(firestore)
    return {
    };
  });
  