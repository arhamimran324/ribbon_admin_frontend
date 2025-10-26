import Image from "next/image";
import React, { FC, PropsWithChildren } from "react";

const Simplelayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="flex flex-col justify-center  lg:flex-row w-full min-h-screen  pb-10 lg:py-10"
      style={{
        backgroundImage: 'url("/assets/images/auth_bg.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full xl:w-[90%] mx-auto flex flex-col items-center  gap-20 md:gap-18  p-1">
        <div className="w-full  h-[100px] flex justify-center items-center">
          <div className="flex justify-center items-center p-4 lg:p-0">
            <Image
              src="/assets/gif/logo.gif"
              alt="logo"
              width={360}
              height={90}
              className="w-[70%] h-auto"
            />
          </div>
        </div>
        <div className="w-full sm:w-[85%] md:w-[75%] lg:w-[50%] flex flex-col justify-center overflow-auto px-3 pb-10">
          <div className="bg-white rounded-[22px] pb-10">
            <div className="w-full flex-grow flex justify-center lg:items-center px-5 sm:px-8 md:px-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simplelayout;
