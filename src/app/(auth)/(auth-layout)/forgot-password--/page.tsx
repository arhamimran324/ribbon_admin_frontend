"use client";

import { useFormik } from "formik";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/shared/button";
import Iconify from "@/components/shared/iconify";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import { Typography } from "@/components/shared/typography";
import { newPasswordForm } from "@/formik/forms/auth";
import { newPasswordSchema } from "@/formik/validations/auth";

const NewPassword = () => {
  const {
    formFields: { newPassword, confirmPassword },
  } = newPasswordForm;

  const {
    values,
    touched,
    errors,
    dirty,
    isValid,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: newPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log("Errors:", errors);

  return (
    <div className="flex flex-col gap-10 w-[75%] py-8">
      <div className="flex justify-start items-center gap-2 w-full group">
        <Iconify
          icon="ic:baseline-arrow-back-ios-new"
          width={15}
          className="text-primary-text group-hover:text-primary-text"
        />
        <Link href={"/reset-password"}>
          <Typography
            size={"lg"}
            className="text-primary-text font-bold group-hover:text-primary-text"
          >
            Back
          </Typography>
        </Link>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center">
        <Typography size={"h3"} className="text-primary-text">
          Setup A New Password
        </Typography>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[20px] w-full">
            <InputPasswordField
              isAuth
              onBlur={handleBlur}
              textColor="text-primary-text"
              strengthChecker={true}
              onChange={handleChange}
              name={newPassword.name}
              styling="bg-transparent"
              label={newPassword.label}
              value={values.newPassword}
              placeholder={newPassword.placeholder}
              labelStyles="text-primary-text bg-transparent"
              error={
                touched.newPassword && errors.newPassword
                  ? errors.newPassword
                  : ""
              }
            />
            <InputPasswordField
              isAuth
              onBlur={handleBlur}
              textColor="text-primary-text"
              styling="bg-transparent"
              onChange={handleChange}
              name={confirmPassword.name}
              label={confirmPassword.label}
              value={values.confirmPassword}
              labelStyles="text-primary-text bg-transparent"
              placeholder={confirmPassword.placeholder}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
            />
            <div className="py-[8px]">
              <Button
                variant={"primary"}
                className="w-full"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
