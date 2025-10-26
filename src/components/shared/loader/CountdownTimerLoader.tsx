import React from "react";
import { motion } from "framer-motion";

const CountdownTimerLoader = () => {
  const placeholderParts = [
    { label: "Days" },
    { label: "Hours" },
    { label: "Min" },
    { label: "Sec" },
  ];

  return (
    <div className="flex items-center justify-center  gap-2 p-2 rounded-2xl ">
      {placeholderParts.map((part, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <motion.div
            className="bg-gray-800 bg-opacity-50 rounded-xl p-2 w-[48px] h-[40px]"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full bg-gray-600 rounded animate-pulse" />
          </motion.div>
          <span className="text-sm uppercase text-black font-medium">
            {part.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimerLoader;
