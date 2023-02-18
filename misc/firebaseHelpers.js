export function errorCodeToMessage(code) {
  if (code.message.includes("The email address is improperly formatted.")) {
    return "The email address is improperly formatted.";
  } else if (
    code.message.includes(
      "The password must be a string with at least 6 characters."
    )
  ) {
    return "The password must be a string with at least 6 characters.";
  } else if (
    code.message.includes(
      "There is no user record corresponding to the provided email."
    )
  ) {
    return "There is no user record corresponding to the provided email.";
  }
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
