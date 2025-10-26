"use client";

import React, { FC, useEffect, useRef, useState } from "react";

import { DropdownProps } from "@/types/dashboard/crm";
import Iconify from "../iconify";

const Dropdown: FC<DropdownProps> = ({
  data = [],
  placeholder,
  className,
  onSelect,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState(
    value || data[0]?.value || "crm",
  );

  useEffect(() => {
    setSelectedValue(value || "crm");
  }, [value]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      ref={dropdownRef}
      className={`relative rounded-[10px] py-2 px-3 ${className}`}
    >
      <div className="flex justify-between gap-2 md:gap-0 py-1 md:p-0  items-center cursor-pointer">
        <button className="text-white md:text-md text-sm ">
          {data.find((item) => item.value === selectedValue)?.label ||
            placeholder}
        </button>
        <Iconify
          icon="solar:alt-arrow-down-line-duotone"
          width={16}
          height={16}
        />
      </div>
      {isOpen && (
        <ul className="absolute w-full bg-white rounded-md mt-4 left-0 z-10 shadow-lg">
          {data.map((item, index) => (
            <li
              key={index}
              className={`flex justify-center items-center px-2 py-1 
          ${index < data.length - 1 ? "border-b border-light-gray" : ""}`}
            >
              <span
                className={`w-full text-sm md:text-md py-1 px-1 text-center rounded-lg
            ${
              item.value === selectedValue
                ? "bg-blue text-white cursor-not-allowed"
                : "text-dark-charcoal hover:text-dark-charcoal hover:bg-light-gray cursor-pointer"
            }`}
                onClick={() =>
                  item.value !== selectedValue && handleSelect(item.value)
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
