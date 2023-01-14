const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.beforeSignIn = functions.auth
  .user()
  .beforeSignIn(async (user, context) => {
    // TODO
    // console.log(user);
    const db = admin.firestore();
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((snap) => {
        console.log(snap.data());
        if (snap.data().requesting === true) {
          throw new functions.auth.HttpsError("permission-denied");
        }
      });
  });
