"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

import { Button } from "@/components/shared/button";
import ContainerCard from "@/components/shared/container/container-card";
import Iconify from "@/components/shared/iconify";
import OtpTimer from "@/components/shared/otp-timer";
import { Typography } from "@/components/shared/typography";
import { optSchema } from "@/formik/validations/auth";

const OtpSection = () => {
  const otpInputRef = useRef(null);
  const [timer, setTimer] = useState<number>(0);
  const [resendCount, setResendCount] = useState<number>(0);

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    validateForm,
  } = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      if (values.otp.length === 6) {
        toast.success("OTP verified successfully!");
        console.log(values);
      } else {
        toast.error("Please enter a 6-digit OTP.");
      }
    },
    validationSchema: optSchema,
  });
  console.log("Errors:", errors);

  const handleOtpChange = (otp: string) => {
    const numericOtp = otp.replace(/\D/g, "");
    setFieldValue("otp", numericOtp);
  };

  const handleResend = () => {
    if (resendCount < 3) {
      setTimer(120);
      setResendCount(resendCount + 1);
      localStorage.setItem("otpTimer", JSON.stringify(120));
    }
  };

  useEffect(() => {
    const storedTimer = localStorage.getItem("otpTimer");
    if (storedTimer) {
      const remainingTime = JSON.parse(storedTimer);
      setTimer(remainingTime);
    }

    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          localStorage.setItem("otpTimer", JSON.stringify(newTime));
          return newTime;
        });
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      localStorage.removeItem("otpTimer");
    }
  }, [timer]);

  return (
    <ContainerCard
      cardHeading="Enter Your OTP"
      headingAlign="left"
      isSubHeading={true}
      subHeading="someone@gmail.com"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center w-full" ref={otpInputRef}>
            <div className="flex flex-col items-start justify-center gap-2">
              <OTPInput
                value={values.otp}
                onChange={handleOtpChange}
                inputStyle={{
                  width: "62.5%",
                  margin: "0 5px",
                  borderRadius: "10px",
                  border: `1px solid ${errors.otp && touched.otp ? "red" : "#969696"}`,
                  backgroundColor: "transparent",
                  textAlign: "center",
                  color: "gray",
                  fontSize: "20px",
                  appearance: "textfield",
                  outline: "none",
                }}
                shouldAutoFocus={true}
                numInputs={6}
                //  inputMode="numeric"
                renderInput={(props) => (
                  <input
                    {...props}
                    className="h-[40px] md:h-[60px] rounded-lg md:rounded-xl w-[62%] my-0 mx-[2px] md:mx-[4px]"
                    type="text"
                    pattern="\d*"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onBlur={() => {
                      setFieldTouched("otp", true, false);
                    }}
                  />
                )}
              />
              {touched.otp && errors.otp ? (
                <div className="flex items-center text-red text-md">
                  <span className="relative top-[1px]">
                    <Iconify
                      icon="bx:error"
                      className="text-red bg-white rounded-full p-[1px]"
                    />
                  </span>
                  <span className="pl-2">{errors.otp}</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <OtpTimer timer={timer} handleResend={handleResend} />
            <Button
              variant={"primary"}
              className="w-full"
              // type="submit"
              onClick={() => {
                validateForm();
              }}
              disabled={!(isValid && dirty && values.otp.length === 6)}
            >
              Submit
            </Button>
            <div className="flex justify-center items-center space-x-2">
              <Typography
                size={"md"}
                as={"p"}
                className="text-secondary-text-gray"
              >
                Want to change the email?
              </Typography>
              <Link href={"/reset-password"}>
                <Typography className="text-primary-light font-semibold underline underline-offset-4 decoration-[1.25px]">
                  Click Here
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </ContainerCard>
  );
};

export default OtpSection;
