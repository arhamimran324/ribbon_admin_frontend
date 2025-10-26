import { cva } from "class-variance-authority";
import React from "react";

import type { VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    variant: {
      primary: [
        "bg-primary-gradient",
        "animated-button",
        "text-white",
        "rounded-[12px]",
        "transition-all",
        "duration-300",
        "ease-in-out",
        "cursor-pointer",
      ],
      secondary: [
        "bg-blue",
        "text-white",
        "rounded-[12px]",
        "border-transparent",
        "hover:opacity-90",
        "transition-all",
        "duration-300",
        "ease-in-out",
        "cursor-pointer",
      ],
      danger: [
        "bg-red",
        "text-white",
        "border-none",
        "rounded-[12px]",
        "hover:opacity-90",
        "transition-all",
        "duration-300",
        "ease-in-out",
        "cursor-pointer",
      ],
      outlined: [
        "bg-white",
        "text-gray",
        "border",
        "border-light-gray",
        "rounded-[12px]",
        // 'hover:opacity-90',
        "transition-all",
        "duration-300",
        "ease-in-out",
        "cursor-pointer",
        "hover:bg-[#F5F3F7]",
      ],
    },
    size: {
      small: ["text-sm", "py-2", "px-4"],
      medium: ["text-lg", "font-semibold", "py-4", "px-6"],
    },
  },
  compoundVariants: [{ variant: "primary", size: "medium" }],
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  ...props
}) => <button className={button({ variant, size, className })} {...props} />;
