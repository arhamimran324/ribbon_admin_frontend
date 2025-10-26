"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/shared/button";
import ContainerCard from "@/components/shared/container/container-card";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import { Typography } from "@/components/shared/typography";
import { logInForm } from "@/formik/forms/auth";
import { loginSchema } from "@/formik/validations/auth";
import { useLogin } from "@/hooks/api/auth/useLogin";
// import { useGetPaymentRecord } from "@/hooks/api/dashboard/useGetPaymentRecord";

const Login: NextPage = () => {
  const { mutate, isPending } = useLogin();
  const {
    formFields: { email, password },
  } = logInForm;

  const {
    values,
    touched,
    isValid,
    errors,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      console.log("values", values);
      mutate(values);
    },
    validationSchema: loginSchema,
  });
  return (
    <ContainerCard cardHeading="Ribbon Bow LOGIN">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 w-full">
          <InputTextField
            name={email.name}
            onBlur={handleBlur}
            value={values.email}
            label={email.label}
            textColor="text-black"
            onChange={handleChange}
            labelStyles={`text-black !font-bold`}
            styling="bg-transparent"
            placeholder={email.placeholder}
            error={touched.email && errors.email ? errors.email : ""}
          />
          <InputPasswordField
            name={password.name}
            label={password.label}
            onBlur={handleBlur}
            textColor="text-black"
            value={values.password}
            onChange={handleChange}
            labelStyles={`text-black !font-bold`}
            styling="bg-transparent"
            placeholder={password.placeholder}
            error={touched.password && errors.password ? errors.password : ""}
          />
        </div>
        <div className="flex justify-start pt-2">
          <Typography
            size="lg"
            as="p"
            className="text-primary-color hover:text-primary-light font-semibold "
          >
            <Link href={"/reset-password"}>Forgot Password?</Link>
          </Typography>
        </div>

        <div className="flex justify-center items-center pt-5">
          <Button
            variant="primary"
            size="medium"
            className="w-full"
            disabled={!(isValid && dirty && !isPending)}
          >
            Log In
          </Button>
        </div>
        {/* <div className="flex justify-center items-center gap-1 pt-8">
          <div className="text-secondary-text-gray">
            <Typography size={"md"}>Don’t Have an Account?</Typography>
          </div>

          <Link
            href={"/sign-up"}
            className="text-primary-color underline hover:text-primary-light"
          >
            <Typography size={"md"}>Signup</Typography>
          </Link>
        </div> */}
      </form>
    </ContainerCard>
  );
};

export default Login;
