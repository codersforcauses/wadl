import { getApp, getApps, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { defineEventHandler, readBody, createError } from "#imports";

export default defineEventHandler(async (event) => {
  const { adminToken, newUser } = await readBody(event);
  console.log(adminToken, newUser.email);

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
    firestore
      .collection("mail")
      .add({
        to: "tomvarian@icloud.com",
        message: {
          subject: "Hello from Firebase!",
          text: "This is the plaintext section of the email body.",
          html: "This is the <code>HTML</code> section of the email body.",
        },
      })
      .then(() => console.log("Queued email for delivery!"));
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: err,
    });
  }
});
