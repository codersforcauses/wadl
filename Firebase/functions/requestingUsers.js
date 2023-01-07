const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.requestingUsers = functions.https.onRequest((req, res) => {
  let information = [];
  const db = admin.firestore();
  db.collection("users")
    .where("requesting", "==", true)
    .get()
    .then((snapshot) => {
      snapshot.forEach((element) => {
        // console.log(element.data());
        const newElement = {
          id: element.data().id,
          first_name: element.data().first_name,
          email: element.data().email,
          institutions: element.data().institutions,
          phone: element.data().phone,
          role: element.data().role,
          last_name: element.data().surname,
        };
        // information = information.concat(newElement);
        console.log(information.push(newElement));
      });
    });
  // console.log(information);
  // const result = JSON.parse(information);
  // console.log(typeof result);
  res.json("helo");
});

// exports.requestingUsers = functions.https.onCall((data, context) => {
//   // ...
//   const uid = context.auth;
//   return "hello world";
// });
