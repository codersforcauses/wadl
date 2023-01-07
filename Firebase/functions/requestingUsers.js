const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.requestingUsers = functions.https.onRequest(async (req, res) => {
  let information = [];
  const db = admin.firestore();
  await db
    .collection("users")
    .where("requesting", "==", true)
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        const newElement = {
          id: element.data().id,
          first_name: element.data().first_name,
          email: element.data().email,
          institutions: element.data().institutions,
          phone: element.data().phone,
          role: element.data().role,
          last_name: element.data().surname,
        };
        console.log(information.push(newElement));
      });
    });
  res.json(information);
});
