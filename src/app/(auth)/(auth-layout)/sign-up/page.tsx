"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import React from "react";

import { Button } from "@/components/shared/button";
import ContainerCard from "@/components/shared/container/container-card";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import { signUpForm } from "@/formik/forms/auth";
import { signUpSchema } from "@/formik/validations/auth";
import { useRegister } from "@/hooks/api/auth/useRegister";
import { Typography } from "@/components/shared/typography";
import Link from "next/link";

const SignUpPage: NextPage = () => {
  const { mutate, isPending } = useRegister();
  const {
    formFields: { full_name, username, email, password1, password2 },
  } = signUpForm;

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
    initialValues: {
      full_name: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      mutate(values);
    },
    validationSchema: signUpSchema,
  });
  return (
    <ContainerCard cardHeading="Signup">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:pt-2">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-between gap-5">
            <div className="w-[50%]">
              <InputTextField
                name={full_name.name}
                onBlur={handleBlur}
                value={values.full_name}
                label={full_name.label}
                textColor="text-black"
                onChange={handleChange}
                labelStyles={`text-black !font-bold`}
                styling="bg-transparent"
                placeholder={full_name.placeholder}
                error={
                  touched[full_name.name as keyof typeof touched] &&
                  errors[full_name.name as keyof typeof errors]
                    ? errors[full_name.name as keyof typeof errors]
                    : ""
                }
              />
            </div>
            <div className="w-[50%]">
              <InputTextField
                name={username.name}
                onBlur={handleBlur}
                value={values.username}
                label={username.label}
                textColor="text-black"
                onChange={handleChange}
                labelStyles={`text-black !font-bold`}
                styling="bg-transparent"
                placeholder={username.placeholder}
                error={
                  touched[username.name as keyof typeof touched] &&
                  errors[username.name as keyof typeof errors]
                    ? errors[username.name as keyof typeof errors]
                    : ""
                }
              />
            </div>
          </div>
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
            error={
              touched[email.name as keyof typeof touched] &&
              errors[email.name as keyof typeof errors]
                ? errors[email.name as keyof typeof errors]
                : ""
            }
          />
          <InputPasswordField
            name={password1.name}
            label={password1.label}
            onBlur={handleBlur}
            textColor="text-black"
            value={values.password1}
            onChange={handleChange}
            labelStyles={`text-black !font-bold`}
            styling="bg-transparent"
            strengthChecker={true}
            placeholder={password1.placeholder}
            error={
              touched[password1.name as keyof typeof touched] &&
              errors[password1.name as keyof typeof errors]
                ? errors[password1.name as keyof typeof errors]
                : ""
            }
          />
          <InputPasswordField
            name={password2.name}
            label={password2.label}
            onBlur={handleBlur}
            textColor="text-black"
            value={values.password2}
            onChange={handleChange}
            labelStyles={`text-black !font-bold`}
            styling="bg-transparent"
            placeholder={password2.placeholder}
            error={
              touched[password2.name as keyof typeof touched] &&
              errors[password2.name as keyof typeof errors]
                ? errors[password2.name as keyof typeof errors]
                : ""
            }
          />
        </div>

        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!(isValid && dirty && !isPending)}
            // onClick={() => router.push('/login')}
          >
            Sign Up
          </Button>
        </div>
        <div className="flex justify-center items-center gap-1 ">
          <div className="text-secondary-text-gray">
            <Typography size={"md"}>Do you have an account?</Typography>
          </div>

          <Link
            href={"/login"}
            className="text-primary-color underline hover:text-primary-light"
          >
            <Typography size={"md"}>Login</Typography>
          </Link>
        </div>
      </form>
    </ContainerCard>
  );
};

export default SignUpPage;
