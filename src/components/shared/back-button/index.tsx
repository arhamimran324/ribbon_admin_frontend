"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "../button";
import Iconify from "../iconify";
import { Typography } from "../typography";

interface BackButtonProps {
  route?: string;
  label?: string | string[];
  iconColor?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  route,
  label = "Back",
  iconColor = "white",
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };

  return (
    <div className=" flex justify-start items-start gap-4">
      <Button
        variant="primary"
        size="small"
        className=" w-8 h-8  flex justify-center items-center rounded-sm"
        onClick={handleClick}
      >
        <Iconify
          icon="eva:arrow-ios-back-fill"
          color={iconColor}
          height="24px"
          width="24px"
          className=""
        />
      </Button>
      <Typography size="h4" className="text-blue font-bold">
        {label}
      </Typography>
    </div>
  );
};

export default BackButton;
