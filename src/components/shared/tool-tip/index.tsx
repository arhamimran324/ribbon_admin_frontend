import React, { useState } from "react";

import { Typography } from "../typography";

interface TooltipProps {
  message: string;
  trigger: "hover" | "click";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  children: React.ReactNode;
  copiedContent?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  message,
  trigger,
  position = "top-right",
  children,
  copiedContent,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    if (trigger === "click" && copiedContent) {
      setIsVisible(true);
      navigator.clipboard?.writeText(copiedContent);
      setTimeout(() => setIsVisible(false), 1000);
    }
  };

  // Positioning Classes
  const positionClasses = {
    "top-left": "bottom-full right-0 mb-2",
    "top-right":
      trigger === "hover"
        ? "bottom-full -left-24 sm:left-0 mb-2"
        : "bottom-full left-0 mb-2",
    "bottom-left": "top-full right-0 mt-2",
    "bottom-right": "top-full left-0 mt-2",
  };

  return (
    <div
      className={`relative inline-block ${trigger === "hover" ? "group" : ""}`}
    >
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      {/* Tooltip */}
      <div
        className={`absolute z-50 p-2 text-sm text-white bg-dark-charcoal rounded-[10px] shadow-lg 
          ${trigger === "hover" ? "max-w-[250px] min-w-[150px]" : ""} break-words whitespace-normal
          ${positionClasses[position]} 
          ${trigger === "hover" ? "hidden group-hover:block" : isVisible ? "block" : "hidden"}`}
      >
        <Typography className="w-full">{message}</Typography>
      </div>
    </div>
  );
};

export default Tooltip;
