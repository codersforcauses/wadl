// const functions = require("firebase-functions");
const killswitch = require("./billingKillswitch");
exports.killswitch = killswitch.stopBilling; // // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
