import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
} from "firebase/auth";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { useUserStore } from "../stores/user";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

export default defineNuxtPlugin(async (nuxtApp) => {
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

  const app = initializeApp(firebaseConfig, "client");
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const functions = getFunctions(app);

  if (config.firebaseMode === "dev") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFunctionsEmulator(functions, "localhost", 5001);
  }

  const userStore = useUserStore();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.setUser(user);
    } else {
      userStore.setUser(null);
    }
  });

  return {
    provide: {
      clientFirestore: firestore,
      clientAuth: auth,
    },
  };
});