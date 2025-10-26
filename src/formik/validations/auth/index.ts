import * as Yup from "yup";

import {
  logInForm,
  optForm,
  resetPasswordForm,
  signUpForm,
} from "@/formik/forms/auth";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const {
  formFields: { email, password },
} = logInForm;

const {
  formFields: { email: resetPassEmail },
} = resetPasswordForm;

const {
  formFields: { otp },
} = optForm;

const { full_name, username, password1, password2 } = signUpForm.formFields;

export const loginSchema = Yup.object({
  email: Yup.string()
    .email(email.errMsgs.inValid)
    .trim()
    .lowercase()
    .matches(emailRegex, { message: email.errMsgs.inValid })
    .required(email.errMsgs.required),
  password: Yup.string()
    .min(8, password.errMsgs.minlength)
    .required(password.errMsgs.required),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email(resetPassEmail.errMsgs.inValid)
    .trim()
    .lowercase()
    .matches(emailRegex, { message: resetPassEmail.errMsgs.inValid })
    .required(resetPassEmail.errMsgs.required),
});

export const newPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, password1.errMsgs.minlength)
    .required(password1.errMsgs.required),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], password2.errMsgs.matchPassword)
    .required(password2.errMsgs.required),
});

export const optSchema = Yup.object({
  otp: Yup.string()
    .required(otp.errMsgs.required)
    .min(1, otp.errMsgs.minlength)
    .max(6, otp.errMsgs.maxlength),
});

export const signUpSchema = Yup.object({
  [full_name.name]: Yup.string()
    .required(full_name.errMsgs.required)
    .min(4, full_name.errMsgs.minlength),
  [username.name]: Yup.string()
    .required(username.errMsgs.required)
    .min(4, username.errMsgs.minlength),

  [email.name]: Yup.string()
    .email(email.errMsgs.inValid)
    .trim()
    .lowercase()
    .matches(emailRegex, { message: email.errMsgs.inValid })
    .required(email.errMsgs.required),
  [password1.name]: Yup.string()
    .min(8, password1.errMsgs.minlength)
    .required(password1.errMsgs.required),
  [password2.name]: Yup.string()
    .oneOf([Yup.ref("password1")], password2.errMsgs.matchPassword)
    .required(password2.errMsgs.required),
});
