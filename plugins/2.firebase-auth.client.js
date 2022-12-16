import { getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // contains nuxt env vars
  const config = useRuntimeConfig();

  const firebaseApp = getApp(); // app initialized in 1.firebase-init.js

  const auth = getAuth(firebaseApp);

  if (config.firebaseMode === "dev") {
    connectAuthEmulator(auth, "http://localhost:9099");
  }

  return {
    provide: {
      auth,
    },
  };
});
