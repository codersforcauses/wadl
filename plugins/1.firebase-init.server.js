import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";

export default defineNuxtPlugin(async (nuxtApp) => {
  // contains nuxt env vars
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
    mode: config.firebaseMode,
  };

  if (config.firebaseMode === "dev") {
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:9090";
  }

  const apps = getApps();
  const newApp = apps.length === 0;

  const firebaseApp =
    apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];

  const db = getFirestore(firebaseApp);

  return {
    provide: {
      db,
    },
  };
});
