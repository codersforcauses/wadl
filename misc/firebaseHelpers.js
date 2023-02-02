export function errorCodeToMessage(code) {
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
