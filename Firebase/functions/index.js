// const functions = require("firebase-functions");
const killswitch = require("./billingKillswitch");
const requestingUsers = require("./requestingUsers");
const requestingState = require("./requestingState");
exports.killswitch = killswitch;
exports.requestingUsers = requestingUsers;
exports.requestingState = requestingState;

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
