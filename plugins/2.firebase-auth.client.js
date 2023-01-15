import { getApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
} from "firebase/auth";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { useUserStore } from "../stores/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // contains nuxt env vars
  const config = useRuntimeConfig();
  const userStore = useUserStore();

  const firebaseApp = getApp(); // app initialized in 1.firebase-init.js

  const auth = getAuth(firebaseApp);

  if (config.firebaseMode === "dev") {
    connectAuthEmulator(auth, "http://localhost:9099");
  }
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.SetUser(user);
    } else {
      userStore.SetUser(null);
    }
  });
  return {
    provide: {
      auth,
    },
  };
});
