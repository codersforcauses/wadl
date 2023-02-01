import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import admin from "firebase-admin";
import { useUserStore } from "../stores/user";
  
  export default defineNuxtPlugin(async (nuxtApp) => {
    const { $serverFirestore, $serverAuth } = useNuxtApp();

    const userStore = useUserStore();

    // if (token) {
    //   try {
    //     const result = await auth.verifyIdToken(token);
    //     userStore = userStore.setUser(result);
    //   } catch {
    //     // Not authenticated or invalid token
    //   }
    // };
    const token = await useCookie(`auth-token`)
    // console.log("token = " + token.value)
    if (token.value) {
      try {
        const result = await $serverAuth.verifyIdToken(token.value);
        userStore.setUser(result);
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
  