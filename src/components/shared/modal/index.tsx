import React, { FC, useRef } from "react";

import Iconify from "../iconify";
import { Typography } from "../typography";

const ModalWrapper: FC<any> = ({ children, title, titleStyling, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full py-10 bg-black bg-opacity-50 backdrop-blur-sm xl:py-0"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white flex flex-col gap-1 rounded-2xl px-10 py-7 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[33%] relative"
      >
        <Iconify
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer"
          height="24"
          width="24"
          icon="material-symbols:cancel-outline-rounded"
          color="#312D2D"
        />
        <Typography
          size="h4"
          className={`text-2xl font-bold mb ${titleStyling}`}
        >
          {title}
        </Typography>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
