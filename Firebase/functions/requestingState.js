const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.beforeSignIn = functions.auth
  .user()
  .beforeSignIn(async (user, context) => {
    const db = admin.firestore();
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((snap) => {
        console.log(snap.data());
        if (!snap.data()) {
          throw new functions.auth.HttpsError(
            "not-found",
            "Account not found, please register an account"
          );
        } else if (snap.data().requesting === true) {
          throw new functions.auth.HttpsError(
            "invalid-argument",
            "Requesting state is true"
          );
        }
      });
  });
