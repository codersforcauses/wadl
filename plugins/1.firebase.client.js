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
import { useCookie } from "#imports" 
// import { getAnalytics } from "firebase/analytics";

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
  // const analytics = getAnalytics(app);

  if (config.firebaseMode === "dev") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFunctionsEmulator(functions, "localhost", 5001);
  }

  // AUTH FUNCTIONS

  const userStore = await useUserStore();

  auth.onIdTokenChanged(async (user) => {
    // on sign-in, sign-out, and token refresh.
    const tokenCookie = await useCookie(
      'auth-token',
      {
        default: "",
        watch: true, // keeps cookie sync'ed
        maxAge: 3600, // firebase cookies expire in an hour.
      }
    )
    if (user) {
      tokenCookie.value = await user.getIdToken(true);
    } else {
      // logged out.
      tokenCookie.value = ""
      userStore.clearStore();
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.setUser(user);
    } else {
      userStore.clearStore();
    }
  });

  return {
    provide: {
      clientFirestore: firestore,
      clientAuth: auth,
      // clientAnalytics: analytics,
    },
  };

  function setServerSession(token) {
    return $fetch("/api/session", {
      method: "POST",
      body: {
        token,
      },
    });
  }
});
