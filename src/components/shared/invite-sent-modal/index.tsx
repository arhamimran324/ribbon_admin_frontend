import Image from "next/image";
import React, { FC, useEffect } from "react";

import { Button } from "../button";
import { Typography } from "../typography";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const InviteSentMessage: FC<Props> = ({ isOpen, onClose }) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
    >
      <div className="bg-white rounded-[22px] shadow-lg p-10 pb-8 w-[500px] max-w-[90%] flex flex-col gap-[21px] items-center">
        <Image
          src="/assets/svg/verified-icon.svg"
          alt="verified-icon"
          width={120}
          height={120}
        />
        <Typography size="h4" className="font-bold text-dark-charcoal">
          Invite Sent Successfully
        </Typography>
        <Button variant="primary" className="w-full" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default InviteSentMessage;
