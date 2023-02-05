import { getAuth } from "firebase-admin/auth";
import { defineNuxtPlugin } from "#imports";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getApp, getApps, initializeApp } from "firebase-admin/app";

export default defineNuxtPlugin(async (nuxtApp) => {
  const serviceAccountCredentials = admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CONFIG)
  );
  const initializedApps = getApps();
  const app = initializedApps.find((app) => app.name === "server")
    ? getApp("server")
    : initializeApp({ credential: serviceAccountCredentials }, "server");
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  return {
    provide: {
      serverFirestore: firestore,
      serverAuth: auth,
    },
  };
});
