import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { useRuntimeConfig } from "../../node_modules/nuxt/dist/app";
import dummy from "../../data/dummy.json" assert { type: "JSON" };


let firebaseConfig;

const clientSide = process.client;

// sets config for client/server
if (clientSide) {
  // client/server side have different scopes for env vars.
  const config = useRuntimeConfig();
  firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
    firebaseMode: config.firebaseMode,
  };
} else {
  firebaseConfig = {
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebasemassagingId,
    appId: process.env.firebaseAppId,
    firebaseMode: process.env.firebaseMode,
  };
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

if (firebaseConfig.firebaseMode === "dev") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  console.log("emulate");
  console.log(dummy)
  
}

export { db };
