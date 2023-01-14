const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.beforeSignIn = functions.auth
  .user()
  .beforeSignIn(async (user, context) => {
    const db = admin.firestore();
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((snap) => {
        if (snap.data().requesting === true) {
          throw new functions.auth.HttpsError(
            "invalid-argument",
            "Requesting state is true"
          );
        }
      });
  });
