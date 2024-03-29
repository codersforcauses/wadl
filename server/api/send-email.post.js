import { getApp, getApps, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { defineEventHandler, readBody, createError } from "#imports";

export default defineEventHandler(async (event) => {
  const { userInfo, emailStructure } = await readBody(event);
  if (!userInfo || !emailStructure) {
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
    if (emailStructure.name === "resetPassword") {
      const resetLink = await auth.generatePasswordResetLink(
        emailStructure.data.userEmail.email
      );
      await firestore
        .collection("mail")
        .add({
          to: [userInfo.email],
          message: {},
          template: {
            name: emailStructure.name,
            data: {
              link: resetLink,
            },
          },
        })
        .then(() => console.log("Queued email for delivery!"));
      return true;
    }
    if (emailStructure.name === "approveUser") {
      await firestore
        .collection("mail")
        .add({
          to: [userInfo.email],
          message: {},
          template: {
            name: emailStructure.name,
            data: {
              name: emailStructure.data.name,
              role: emailStructure.data.role,
            },
          },
        })
        .then(() => console.log("Queued email for delivery!"));
      return true;
    }
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: err,
    });
  }
});
