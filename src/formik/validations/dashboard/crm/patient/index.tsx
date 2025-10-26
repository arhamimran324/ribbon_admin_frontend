import * as Yup from "yup";

export const AddPharmaSchema = Yup.object({
  companyName: Yup.string()
    .required("Company Name is required")
    .min(2, "Company Name must be at least 2 characters")
    .max(100, "Company Name cannot exceed 100 characters"),
  companyRegisteredIn: Yup.string().required(
    "Company Registered In is required",
  ),
  registrationNo: Yup.string()
    .required("Registration No is required")
    .matches(
      /^[a-zA-Z0-9-]+$/,
      "Registration No must contain only letters, numbers, or dashes",
    ),
  vatRegistrationNo: Yup.string()
    .optional()
    .matches(
      /^[a-zA-Z0-9-]*$/,
      "VAT Registration No must contain only letters, numbers, or dashes",
    ),
  emailAddress: Yup.string()
    .required("Email Address is required")
    .email("Enter a valid email address"),
  phoneNo: Yup.string()
    .required("Phone No is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Enter a valid phone number"),
  postalCode: Yup.string()
    .required("Postal Code is required")
    .matches(/^[0-9]{4,6}$/, "Enter a valid postal code"),
});

export const addRoleSchema = Yup.object({
  roleTitle: Yup.string().required("Role Name is required"),
});

// Validation schema
export const subscriptionFormSchema = Yup.object({
  fullname: Yup.string().required("Full name is required"),
  username: Yup.string().required("Discord user name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // phone: Yup.string().required("Phone number is required"),
  message: Yup.string(),
});
