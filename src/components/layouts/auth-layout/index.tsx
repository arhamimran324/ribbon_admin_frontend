import Image from "next/image";
import React, { FC, PropsWithChildren } from "react";

const Authlayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="flex flex-col justify-center items-center lg:flex-row w-full min-h-screen  py-10 lg:py-0"
      style={{
        backgroundImage: 'url("/assets/images/auth_bg.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full xl:w-[90%] mx-auto flex flex-col items-center lg:items-stretch gap-4 sm:gap-6 lg:gap-10 p-1 lg:p-10 lg:flex-row">
        <div className="w-full lg:w-[50%] h-[100px] lg:h-[88vh] flex justify-center items-center">
          <div className="flex justify-center bg-white items-center p-4  rounded-full">
            <Image
              src="/assets/svg/logo.svg"
              alt="logo"
              width={200}
              height={200}
              // className="w-[80%] md:w-[80%] lg:w-full lg:max-w-full h-auto"
            />
          </div>
        </div>
        <div className="w-full sm:w-[85%] md:w-[75%] lg:w-[50%] flex flex-col justify-center overflow-auto px-3">
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

export default Authlayout;
