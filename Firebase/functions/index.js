// const functions = require("firebase-functions");
const killswitch = require("./billingKillswitch");
const requestingUsers = require("./requestingUsers");
exports.killswitch = killswitch;
exports.requestingUsers = requestingUsers;

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
