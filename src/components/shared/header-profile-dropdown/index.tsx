"use client";

import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setIsLogoutModel } from "@/redux/slices/app-slice";
import { HeaderProfileDropDownProps } from "@/types/dashboard/crm";
import Iconify from "../iconify";
import { Typography } from "../typography";

const HeaderProfileDropDown: FC<HeaderProfileDropDownProps> = ({
  className,
  dropdownItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleSelect = (name: string) => {
    if (name === "Logout") {
      dispatch(setIsLogoutModel(true));
    }
    setIsOpen(false);
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
    <>
      <div ref={dropdownRef} className={`relative rounded-[10px] ${className}`}>
        <div
          className=" cursor-pointer border-2 border-light-gray rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={"/assets/svg/header-profile-image.svg"}
            height={47}
            width={47}
            alt="profile image is missing"
          />
        </div>
        {isOpen && dropdownItems && (
          <ul className="absolute bg-white w-[202px] rounded-2xl mt-4 -left-40 z-10 shadow-lg">
            {dropdownItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item.name)}
                className={`px-1 py-2 cursor-pointer ${index < dropdownItems.length - 1 ? "border-b border-light-gray" : ""}`}
              >
                <div
                  className={`${item.hoverBg} hover:rounded-xl ${item.color} ${item.hoverText} flex gap-6 items-center py-2 px-5`}
                >
                  <span className="flex items-center">
                    <Iconify icon={item.icon} width="16px" height="16px" />
                  </span>
                  <Typography
                    size="md"
                    className="py-1 px-1 text-center font-medium"
                  >
                    {item.name}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default HeaderProfileDropDown;
