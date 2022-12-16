import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

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

  const apps = getApps();
  console.log(apps.length);
  const firebaseApp =
    apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];

  const db = getFirestore(firebaseApp);

  if (config.firebaseMode === "dev") {
    connectFirestoreEmulator(db, "localhost", 8080);
    console.log("emulate");
  }

  return {
    provide: {
      db,
    },
  };
});
