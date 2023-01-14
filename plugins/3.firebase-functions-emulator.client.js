import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";

export default defineNuxtPlugin(async (nuxtApp) => {
  // contains nuxt env vars
  const config = useRuntimeConfig();
  if (config.firebaseMode === "dev") {
    const firebaseApp = getApp();
    const functions = getFunctions(firebaseApp);
    connectFunctionsEmulator(functions, "localhost", 5001);
    console.log("emulating functions");
  }
});
