import { cva } from "class-variance-authority";
import React from "react";

import type { VariantProps } from "class-variance-authority";

const typography = cva("", {
  variants: {
    size: {
      h1: ["text-h1 font-extrabold"],
      h2: ["text-h2 font-bold"],
      h3: ["text-h3 font-bold"],
      h4: ["text-h4 font-bold"],
      h5: ["text-h5 font-bold"],
      h6: ["text-h6 font-bold"],
      xl: ["text-xl"],
      lg: ["text-lg"],
      md: ["text-md"],
      sm: ["text-sm"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typography> {
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  as: Component = "p",
  className = "",
  size,
  ...props
}) => {
  return (
    <Component className={`${typography({ size })} ${className}`} {...props} />
  );
};
