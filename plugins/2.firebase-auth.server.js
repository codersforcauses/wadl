import { getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { useUserStore } from "../stores/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // contains nuxt env vars
  const config = useRuntimeConfig();
  const userStore = useUserStore();

  const firebaseApp = getApp(); // app initialized in 1.firebase-init.js

  const auth = getAuth(firebaseApp);

  // await onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     userStore.SetUser(user);
  //   } else {
  //     userStore.SetUser(null);
  //   }
  // });
  return {
    provide: {
      auth,
    },
  };
});
