"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/shared/button";
import ContainerCard from "@/components/shared/container/container-card";
import Iconify from "@/components/shared/iconify";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import { Typography } from "@/components/shared/typography";
import { resetPasswordForm } from "@/formik/forms/auth";
import { forgotPasswordSchema } from "@/formik/validations/auth";
import { useResetPassword } from "@/hooks/api/auth/useResetPassword";

const ResetPassword: NextPage = () => {
  const {
    formFields: { email },
  } = resetPasswordForm;
  const { mutate, isPending } = useResetPassword();
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
    handleReset,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      mutate(values.email);
      // handleReset(values);
    },
  });
  return (
    <ContainerCard cardHeading=" Reset Password">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7">
          <InputTextField
            isAuth
            name={email.name}
            onBlur={handleBlur}
            value={values.email}
            label={email.label}
            textColor="text-black"
            onChange={handleChange}
            labelStyles="text-black"
            styling="bg-transparent"
            placeholder={email.placeholder}
            error={touched.email && errors.email ? errors.email : ""}
          />
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              className="w-full"
              disabled={!dirty || !isValid || isSubmitting || isPending}
            >
              Reset Password
            </Button>
            <div className="flex space-x-1 items-center justify-center ">
              <div className="flex justify-center items-center gap-2 text-center group">
                <Iconify
                  icon="material-symbols:arrow-back-rounded"
                  className="text-secondary-text-gray group-hover:text-primary-light cursor-pointer"
                />
                <Link
                  href={"/login"}
                  className="text-secondary-text-gray group-hover:text-primary-light text-center"
                >
                  <Typography size={"md"}>Back to Login</Typography>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ContainerCard>
  );
};

export default ResetPassword;
