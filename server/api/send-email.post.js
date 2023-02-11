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
      const data = {
        name: emailStructure.name,
        data: {
          link: resetLink,
        },
      };
      await firestore
        .collection("mail")
        .add({
          to: [userInfo.email],
          data,
        })
        .then(() => console.log("Queued email for delivery!"));
      event.res.status(200).send({ message: "Success" });
      event.res.end();
    }
    if (emailStructure.name === "approveUser") {
      await firestore
        .collection("mail")
        .add({
          to: ["benjamin9804@icloud.com"],
          template: {
            name: emailStructure.name,
            data: {
              name: emailStructure.data.name,
              role: emailStructure.data.role,
            },
          },
        })
        .then(() => console.log("Queued email for delivery!"));
      // event.res.status(200).send({ message: "Success" });
      // event.res.end();
      return true;
    }
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: err,
    });
  }
});
