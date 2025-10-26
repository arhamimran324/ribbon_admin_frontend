export const logInForm = {
  id: "01-sign-in-form",
  formFields: {
    email: {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter your email",
      errMsgs: {
        required: "Email Address is required.",
        inValid: "Email must be valid.",
      },
    },
    password: {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Password is required.",
        minlength: "Password must be at least 8 characters long",
      },
    },
  },
};

export const resetPasswordForm = {
  id: "02-forgot-password-form",
  formFields: {
    email: {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter your email",
      errMsgs: {
        required: "Email Address is required.",
        inValid: "Email must be valid.",
      },
    },
  },
};

export const newPasswordForm = {
  id: "03-new-password-form",
  formFields: {
    newPassword: {
      type: "password",
      name: "newPassword",
      label: "Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Password is required.",
        minlength: "Password must be at least 8 characters long",
      },
    },
    confirmPassword: {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Confirm Password is required.",
        matchPassword: "Confirm Password must be match",
      },
    },
  },
};

export const optForm = {
  id: "04-otp-form",
  formFields: {
    otp: {
      type: "text",
      name: "otp",
      label: "OTP",
      placeholder: "Enter your OTP",
      errMsgs: {
        required: "OTP is required.",
        minlength: "OTP must be at least 1 characters long",
        maxlength: "OTP must be at most 6 characters long",
      },
    },
  },
};

export const signUpForm = {
  id: "05-sign-up-form",
  formFields: {
    full_name: {
      type: "text",
      name: "full_name",
      label: "Full Name",
      placeholder: "Enter your Full Name",
      errMsgs: {
        required: "Full Name is required.",
        minlength: "Full Name must be at least 4 characters long",
      },
    },
    username: {
      type: "text",
      name: "username",
      label: "User Name",
      placeholder: "Enter your User Name",
      errMsgs: {
        required: "User Name is required.",
        minlength: "User Name must be at least 4 characters long",
      },
    },
    email: {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter your email",
      errMsgs: {
        required: "Email Address is required.",
        inValid: "Email must be valid.",
      },
    },
    password1: {
      type: "password",
      name: "password1",
      label: "Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Password is required.",
        minlength: "Password must be at least 8 characters long",
      },
    },
    password2: {
      type: "password",
      name: "password2",
      label: "Confirm Password",
      placeholder: "Enter your password",
      errMsgs: {
        required: "Confirm Password is required.",
        minlength: "Password must be match",
        matchPassword: "Password must be match",
      },
    },
  },
};
