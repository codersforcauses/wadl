import { getApp, getApps, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { defineEventHandler, readBody, createError } from "#imports";

export default defineEventHandler(async (event) => {
  const { userInfo, emailStructure } = await readBody(event);
  if (!userInfo) {
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
      const template = {
        name: emailStructure.name,
        data: {
          link: resetLink,
        },
      };
      firestore
        .collection("mail")
        .add({
          to: userInfo.email,
          template,
        })
        .then(() => console.log("Queued email for delivery!"));
      event.res.send(204);
      // return null;
    }
    if (emailStructure.name === "approveUser") {
      const template = {
        name: emailStructure.name,
        data: {
          name: emailStructure.data.name,
          role: emailStructure.data.role,
        },
      };
      firestore
        .collection("mail")
        .add({
          to: userInfo.email,
          template,
        })
        .then(() => console.log("Queued email for delivery!"));
      // return null;
      event.res.send(204);
    }
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: err,
    });
  }
});
