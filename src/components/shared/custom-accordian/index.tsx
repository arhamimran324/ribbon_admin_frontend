import React, { useState } from "react";

import Iconify from "../iconify";

interface CustomAccordionProps {
  title: string;
  content: React.ReactNode;
  value: string;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  content,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-none rounded-lg shadow-sm overflow-hidden border border-blue">
      <div className="px-2 md:px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-4 focus:outline-none group"
          aria-expanded={isOpen}
          aria-controls={`content-${value}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3">
              <span className="text-lg text-blue font-bold">{title}</span>
            </div>
            <Iconify
              color={"#316E96"}
              height={20}
              width={20}
              icon="tabler:chevron-down"
              className={`transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        <div
          id={`content-${value}`}
          className={`
            grid overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
          `}
          role="region"
          aria-labelledby={`header-${value}`}
        >
          <div className="overflow-hidden">
            <div className="px-1 sm:px-3 py-4">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAccordion;
