import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { useRuntimeConfig } from "../../node_modules/nuxt/dist/app";

export default firebaseInit(async (nuxtApp) => {

  // contains nuxt env vars
  const config = useRuntimeConfig();
  
  let firebaseConfig;
  firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
    mode: config.firebaseMode,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  if (firebaseConfig.mode === "dev") {
    connectFirestoreEmulator(db, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    console.log("emulate");
  }

  return {
      provide: {
          db: db,
          auth: auth
      }
  }
})