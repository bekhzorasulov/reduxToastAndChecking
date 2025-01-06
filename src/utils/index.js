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

// utils.js
export function validateSignupOrLoginData(actionData, isSignup = false) {
  if (!actionData) {
    return { valid: false, errors: { general: "No data provided." } };
  }

  const { displayName, email, password, confirmPassword } = actionData;
  const errors = {};

  // Signup-specific validation
  if (isSignup) {
    if (!displayName || displayName.trim().length < 3) {
      errors.displayName = "Display name must be at least 3 characters long.";
    }

    if (!confirmPassword || password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Invalid email address.";
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (Object.keys(errors).length === 0) {
    return { valid: true };
  }

  return { valid: false, errors };
}

export function validateProjectData(projectData) {
  if (!projectData) {
    return {
      valid: false,
      errors: { general: "Please provide project data." },
    };
  }

  const { name, dueDate, details, category, assignedUsersList } = projectData;
  const errors = {};

  // Name validation
  if (!name || name.trim().length < 3) {
    errors.name = "Project name should be at least 3 characters long.";
  }

  // Due date validation
  if (!dueDate || isNaN(dueDate.seconds) || isNaN(dueDate.nanoseconds)) {
    errors.dueDate = "Please provide a valid due date.";
  }

  // Details validation
  if (!details || details.trim().length < 10) {
    errors.details = "Project details should be at least 10 characters long.";
  }

  // Category validation
  if (!category || category.value < 3) {
    errors.category = "Category should be at least 3 characters long.";
  }

  // AssignedUsersList validation
  if (!Array.isArray(assignedUsersList) || assignedUsersList.length === 0) {
    errors.assignedUsersList =
      "Please assign at least one user to the project.";
  }

  if (Object.keys(errors).length === 0) {
    return { valid: true };
  }

  return { valid: false, errors };
}

export function formatCommentTime(commentTime) {
  const date = new Date(
    commentTime.seconds * 1000 + Math.floor(commentTime.nanoseconds / 1e6)
  );
  const now = new Date();

  const timeDiff = now - date;
  const oneDay = 24 * 60 * 60 * 1000;

  if (timeDiff < oneDay && now.getDate() === date.getDate()) {
    return {
      day: "Today",
      hour: `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
    };
  }

  if (timeDiff < 2 * oneDay && now.getDate() - date.getDate() === 1) {
    return {
      day: "Yesterday",
      hour: `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
    };
  }

  return {
    day: `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`,
    hour: `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`,
  };
}
