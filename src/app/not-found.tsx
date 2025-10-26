"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen ">
      <div className="w-full flex flex-col justify-center items-center gap-6 px-6 md:p-0">
        <div className="max-w-[70%] md:w-full flex justify-center items-center">
          <Image
            src="/assets/images/404.svg"
            alt="404"
            height={300}
            width={300}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-0.5">
          <Typography
            as="p"
            className="text-gray font-semibold !text-[18px] text-center"
          >
            Page you are looking for is currently unavailable
          </Typography>
          <Typography size="lg" className="text-gray font-normal text-center">
            But don’t worry, you can go back to home by clicking the button
            below
          </Typography>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button
            variant="primary"
            className="w-32"
            onClick={() => router.replace("/dashboard")}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
