import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";



let app;
let db;
let firebaseConfig;

let clientSide = process.client;

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

app = initializeApp(firebaseConfig);
db = getFirestore(app);

if (firebaseConfig.firebaseMode === "dev") {
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log("emulate");
} 

export { db };
