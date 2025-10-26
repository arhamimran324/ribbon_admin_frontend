"use client";

import { FC, useState } from "react";

import { Typography } from "@/components/shared/typography";
import { InputFieldProps } from "@/types";
import Iconify from "../../iconify";

const InputTextField: FC<InputFieldProps> = ({
  name,
  label,
  value,
  error,
  onBlur,
  onFocus,
  styling,
  required,
  onChange,
  disabled,
  labelStyles,
  placeholder,
  textColor = "text-black",
  placeholderTop = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      {label && (
        <div>
          <Typography size="lg" className={`font-semibold ${labelStyles}`}>
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        </div>
      )}
      <div className="relative">
        {placeholderTop && (
          <label
            className={`absolute left-5 transition-all duration-200 ${
              isFocused || value !== ""
                ? "-top-2 text-md font-semibold text-gray bg-white px-1"
                : "top-4 text-lg text-light-gray font-semibold"
            }`}
          >
            {placeholder}
          </label>
        )}
        <input
          {...props}
          type="text"
          name={name}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholderTop ? "" : placeholder}
          className={`px-5 py-[1.1rem] h-[3.8rem] ${textColor} border ${
            error ? "border-red" : "border-primary-color"
          } text-lg placeholder:text-lg placeholder:text-placeholder-gray disabled:text-gray disabled:border-primary-color placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-dull-white focus:outline-none rounded-[12px] w-full ${
            error ? "hover:border-red" : "hover:border-primary-color"
          } ${styling}`}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 ">
          <Iconify
            icon="bx:error"
            className="text-red bg-white rounded-full p-[1px]"
          />
          <Typography size="md" className={"text-red"}>
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InputTextField;
