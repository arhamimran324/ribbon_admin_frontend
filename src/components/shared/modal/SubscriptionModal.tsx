"use client";

import React from "react";
import { useFormik } from "formik";
import { Button } from "@/components/shared/button";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import { subscriptionFormSchema } from "@/formik/validations/dashboard/crm/patient";
import { Typography } from "@/components/shared/typography";
import { useAppSelector } from "@/redux/hooks";
// import { useGetDiscordLink } from "@/hooks/api/dashboard/useGetDiscordLink";
import ModalWrapper from ".";
// import { useSetFreeTrail } from "@/hooks/api/dashboard/useSetFreeTrail";

interface SubscriptionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose: (open: boolean) => void;
}

const initialValues = {
  fullname: "",
  username: "",
  email: "",
  message: "",
};

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  setIsOpen,
  onClose,
}) => {
  // const { data } = useGetDiscordLink();

  // const { mutate } = useSetFreeTrail(() => setIsOpen(false));
  const userId = useAppSelector((state) => state?.auth?.user?.id);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema: subscriptionFormSchema,
    onSubmit: (values) => {
      console.log("values", { user_id: userId, ...values });
      // mutate({ user_id: userId, ...values });
    },
  });

  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white rounded-2xl p-3">
        <Typography
          size="xl"
          className="text-primary-text text-2xl font-bold mb-4 text-center"
        >
          Enjoy a Free Trial – Continue Now
        </Typography>
        <Typography className="text-sm text-gray-500 italic">
          If you don’t have a Discord account, please create one first. To join
          our community:
          <br />
          1.{" "}
          {/* <a
            href={data?.invite_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Click here to join our Discord community
          </a> */}
          <br />
          2. Once you’ve joined, copy your Discord username (e.g.,{" "}
          <strong>JohnDoe#1234</strong>) and paste it below.
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full">
              <InputTextField
                name="fullname"
                label="Full Name"
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Full Name"
                error={
                  touched.fullname && errors.fullname ? errors.fullname : ""
                }
              />
            </div>
            <div className="w-full">
              <InputTextField
                name="username"
                label="Discord UserName"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Discord User Name"
                error={
                  touched.username && errors.username ? errors.username : ""
                }
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              <InputTextField
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Email"
                error={touched.email && errors.email ? errors.email : ""}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Write your message..."
              className={`w-full px-4 py-3 rounded-lg border border-primary-color focus:outline-none resize-none transition-all ${
                touched.message && errors.message
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.message && errors.message && (
              <span className="text-sm text-red-500">{errors.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={!(dirty && isValid)}
            className="w-full py-3 text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            Begin Free Trial
          </Button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default SubscriptionModal;
