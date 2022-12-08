import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

let app: FirebaseApp;
let db: Firestore;

let clientSide: boolean = process.client;

// sets config for client/server
if (clientSide) {
  // client/server side have different scopes for env vars.
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
  };
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  const firebaseConfig = {
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebasemassagingId,
    appId: process.env.firebaseAppId,
  };
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}
export { db };
