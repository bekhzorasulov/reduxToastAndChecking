export const getFirebaseAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/invalid-email":
      "The email address is not valid. Please check and try again.",
    "auth/user-disabled":
      "This user account has been disabled. Please contact support.",
    "auth/user-not-found":
      "No user found with this email. Please sign up or try a different email.",
    "auth/invalid-credential":
      "No user found with this email. Please sign up or try a different email.",
    "auth/wrong-password": "The password is incorrect. Please try again.",
    "auth/email-already-in-use":
      "This email is already associated with an account. Please use another email.",
    "auth/weak-password":
      "The password is too weak. Please choose a stronger password.",
    "auth/operation-not-allowed":
      "This operation is not allowed. Please contact support.",
    "auth/too-many-requests":
      "Too many login attempts. Please try again later.",
    "auth/requires-recent-login":
      "This operation requires recent authentication. Please sign in again.",
  };

  return (
    errorMessages[errorCode] ||
    "An unknown error occurred. Please try again later."
  );
};
