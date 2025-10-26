/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  launchdate: Date | string | null;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ launchdate }) => {
  const [timerParts, setTimerParts] = useState([
    { value: "00", label: "Days" },
    { value: "00", label: "Hours" },
    { value: "00", label: "Min" },
    { value: "00", label: "Sec" },
  ]);

  function formatTime(time: number) {
    if (time <= 0) {
      return [
        { value: "00", label: "Days" },
        { value: "00", label: "Hours" },
        { value: "00", label: "Min" },
        { value: "00", label: "Sec" },
      ];
    }

    const days = Math.floor(time / (3600 * 24))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((time % (3600 * 24)) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return [
      { value: days, label: "Days" },
      { value: hours, label: "Hours" },
      { value: minutes, label: "Min" },
      { value: seconds, label: "Sec" },
    ];
  }

  useEffect(() => {
    const date =
      typeof launchdate === "string" ? new Date(launchdate) : launchdate;

    if (!date || isNaN(date?.getTime())) {
      setTimerParts(formatTime(0));
      return;
    }

    const launchTime = date.getTime();

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      let intervalId;
      const remaining = Math.floor((launchTime - currentTime) / 1000);

      if (remaining >= 0) {
        setTimerParts(formatTime(remaining));
      } else {
        setTimerParts(formatTime(0));
        clearInterval(intervalId);
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [launchdate]);

  return (
    <div className="flex items-center justify-center  gap-2 p-2 rounded-2xl ">
      {timerParts?.map((part, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-primary-gradient rounded-xl p-1"
          >
            <motion.span
              key={part.value}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[14px] font-bold text-white drop-shadow-md w-7 h-7 flex justify-center items-center"
            >
              {part.value}
            </motion.span>
          </motion.div>
          <span className="text-[10px] uppercase text-black font-medium">
            {part.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
