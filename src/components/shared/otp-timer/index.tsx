import React, { FC } from "react";

import { formatTime } from "@/utils/format-time";
import { Typography } from "../typography";

interface TimerProps {
  timer: number;
  handleResend: () => void;
}

const OtpTimer: FC<TimerProps> = ({ timer, handleResend }) => {
  return (
    <div className="flex justify-end items-center space-x-2">
      <Typography
        size={"md"}
        as={"p"}
        className="text-secondary-text-gray opacity-80"
      >
        {timer > 0 ? formatTime(timer) : "00:00"}
      </Typography>
      <button onClick={handleResend} disabled={timer > 0} type="button">
        <Typography
          size={"md"}
          className={`font-semibold underline underline-offset-4 decoration-[1.25px] ${timer > 0 ? "text-secondary-text-gray opacity-80 cursor-not-allowed" : "text-secondary-text-gray  hover:text-primary-light"}`}
        >
          Resend OTP
        </Typography>
      </button>
    </div>
  );
};

export default OtpTimer;
