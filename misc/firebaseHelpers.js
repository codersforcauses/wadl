/**
 * Converts the `code` attribute of a Firebase error into a human-readable message.
 * @param {String} code The `code` property of an FirebaseError.
 * @returns {String} A human readable error message.
 */
function errorCodeToMessage(code) {
  switch (code) {
    case "auth/user-not-found":
      return "Account not found, try again with a new account";
    case "auth/email-already-in-use":
      return "E-mail already in use";
    case "auth/email-already-exists":
      return "E-mail already exists";
    case "auth/network-request-failed":
      return "Network Failed, Please try again";
    case "auth/wrong-password":
      return "Incorrect Password or Email";
    default:
      return "Encountered an error";
  }
}

/**
 * Converts a firebase or non-firebase error into a human readable message for the end-user.
 * @param {Error | import("firebase-admin").FirebaseError} error the error.
 * @returns {String} the error as a human readable message.
 */
export function handleError(error) {
  if (error.code) {
    return errorCodeToMessage(error.code);
  } else if (error.message) {
    return error.message;
  } else if (error === "tie-occured") {
    return "A tie occurred, please resolve the tie before submitting.";
  } else {
    return "An error occurred.";
  }
}
