import { getApp, getApps, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { defineEventHandler, readBody, createError } from "#imports";

export default defineEventHandler(async (event) => {
  const { adminToken, userInfo, emailContent } = await readBody(event);
  console.log(adminToken, userInfo, emailContent);

  if (!adminToken || !userInfo) {
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
    // const resetLink = await auth.generatePasswordResetLink(userInfo.email);
    // const message = {
    //   subject: emailContent.subject,
    //   html: "<div><h1>HELLO WORLD</h1><img src='https://storage.googleapis.com/wadl-logos/ShortLogo.png' style='width:200px;height:52px;'></div>",
    // };
    firestore
      .collection("mail")
      .add({
        to: "benjamin9804@icloud.com",
        template: {
          name: "approve",
          data: {
            name: userInfo.firstName + " " + userInfo.lastName,
          },
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
