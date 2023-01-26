import { getApp, getApps, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { defineEventHandler, readBody, createError } from "#imports";

export default defineEventHandler(async (event) => {
  const { adminToken, newUser } = await readBody(event);

  if (!adminToken || !newUser) {
    throw createError({
      statusCode: 400,
    });
  }

  const serviceAccountCredentials = admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CONFIG)
  );

  const initializedApps = getApps();
  const app = initializedApps.find((app) => app.name === "server")
    ? getApp("server")
    : initializeApp({ credential: serviceAccountCredentials }, "server");

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  try {
    const claims = await auth.verifyIdToken(adminToken);
    const adminUser = await firestore.runTransaction(async (transaction) => {
      const snap = await transaction.get(
        firestore.collection("users").doc(claims.uid)
      );

      return snap.data();
    });

    if (adminUser.role !== "Admin") {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const authUser = await auth.createUser({
      email: newUser.email,
      password: newUser.password,
    });

    // TODO: Use custom claims for authorization
    // auth.setCustomUserClaims(authUser.uid, { role: "admin" });

    await firestore.runTransaction(async (transaction) => {
      transaction.set(firestore.collection("users").doc(authUser.uid), {
        role: "Admin",
        requesting: false,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
      });
    });
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: err,
    });
  }
});
