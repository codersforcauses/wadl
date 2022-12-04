import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

let app: FirebaseApp;
let db: Firestore;

let clientSide: boolean = process.client;

if (clientSide) {
  const config = useRuntimeConfig();
  // Runs on the client side
  console.log("config is: \n\n");
  console.log(config.firebaseApiKey);

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
  // TODO: useRunTimeConfig does not work on server side - docs say it should.
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
