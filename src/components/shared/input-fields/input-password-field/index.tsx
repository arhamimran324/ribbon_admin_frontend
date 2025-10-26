"use client";

import { FC, useEffect, useState } from "react";

import { Typography } from "@/components/shared/typography";
import { InputPasswordFieldProps } from "@/types";
import CustomCheckbox from "../../custom-checkbox";
import Iconify from "../../iconify";

const InputPasswordField: FC<InputPasswordFieldProps> = ({
  disabled,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  name,
  labelStyles,
  error,
  styling,
  textColor = "text-black",
  strengthChecker = false,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [strength, setStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    noForbiddenWords: false,
  });

  const forbiddenWords = ["password", "blockmedpro"];

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const evaluateStrength = (password: string) => {
    const lowerPassword = password.toLowerCase();
    const conditions = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[^a-zA-Z0-9]/.test(password),
      noForbiddenWords: !forbiddenWords.some((word) =>
        lowerPassword.includes(word),
      ),
    };

    setRequirements(conditions);

    let score = 0;
    if (conditions.length) score += 1;
    if (conditions.uppercase) score += 1;
    if (conditions.number) score += 1;
    if (conditions.specialChar) score += 1;
    if (conditions.noForbiddenWords) score += 1;

    score = Math.min(score, 5);

    setStrength(score);
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Moderate";
      case 4:
        return "Strong";
      case 5:
        return "Very Strong";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (strengthChecker && value) {
      evaluateStrength(value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, strengthChecker]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Typography size="lg" className={`font-semibold ${labelStyles}`}>
          {label}
          {required && <span className="text-red">*</span>}
        </Typography>
      </div>
      <div className="relative">
        <input
          name={name}
          disabled={disabled}
          type={passwordVisible ? "text" : "password"}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
          className={`px-5 py-4 h-[3.8rem] ${error ? "hover:border-red" : "hover:border-primary-color"} disabled:bg-dull-white ${textColor} border ${error ? "border-red" : "border-primary-color"} text-lg placeholder:text-lg placeholder:text-placeholder-gray placeholder:font-medium font-medium focus:outline-none rounded-[12px] w-full ${styling}`}
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-5 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? (
            <Iconify icon="mdi:eye" width="20" height="20" color="#312D2D" />
          ) : (
            <Iconify
              icon="mdi:eye-off"
              width="20"
              height="20"
              color="#312D2D"
            />
          )}
        </div>
      </div>
      {strengthChecker && value && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${(strength / 5) * 100}%`,
                  backgroundColor:
                    strength < 2 ? "red" : strength < 4 ? "orange" : "#45ba8c",
                }}
              />
            </div>
            <div className="ml-2 text-sm text-secondary-text-gray">
              {getStrengthLabel()}
            </div>
          </div>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-center">
              <CustomCheckbox
                label="At least 8 characters long."
                checked={requirements.length}
                onChange={() => {}}
              />
            </li>
            <li className="flex items-center">
              <CustomCheckbox
                label="At least one uppercase letter."
                checked={requirements.uppercase}
                onChange={() => {}}
              />
            </li>
            <li className="flex items-center">
              <CustomCheckbox
                label="At least one digit."
                checked={requirements.number}
                onChange={() => {}}
              />
            </li>
            <li className="flex items-center">
              <CustomCheckbox
                label="At least one special character."
                checked={requirements.specialChar}
                onChange={() => {}}
              />
            </li>
          </ul>
        </>
      )}
      {error && (
        <div className="flex items-center gap-1  ">
          <span className="relative top-[1px]">
            <Iconify
              icon="bx:error"
              className="text-red bg-white rounded-full p-[1px]"
            />{" "}
            <Iconify
              icon={`bx:error" className="text-red  rounded-full p-[1px]`}
            />
          </span>
          <Typography size="md" className={`text-red`}>
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InputPasswordField;
