"use client";

import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";

import Modal from "@/components/shared/custom-modal";
import { PaginatedData } from "@/types/dashboard/crm";
import Iconify from "../iconify";
import { Typography } from "../typography";

export interface BlockDropdownProps {
  type?: string;
  styling?: string;
  invoices?: boolean;
  index?: number;
  onOptionClick?: (name: string) => void;
  paginatedData?: PaginatedData;
}

interface Option {
  name: string;
  route?: string;
}

const CustomDropdown: FC<BlockDropdownProps> = ({
  styling,
  invoices,
  type,
  index = 0,
  paginatedData,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [blockPeriod, setBlockPeriod] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const blockOptions: Option[] = [
    { name: "Block for week" },
    { name: "Block for month" },
    { name: "Block permanently" },
  ];

  const appointmentOptions: Option[] = [
    {
      name: "View Prescription",
      route: "/crm/patients/invoices/prescription-invoice",
    },
    {
      name: "Pharmacy Invoice",
      route: "/crm/patients/invoices/pharmacy-invoice",
    },
    { name: "Clinic Invoice", route: "/crm/patients/invoices/clinic-invoice" },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (name: string, route?: string) => {
    if (route) {
      router.push(route);
    } else if (!invoices) {
      setBlockPeriod(name);
      setModalOpen(true);
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
    <div ref={dropdownRef} className="relative">
      {/* Dropdown Toggle */}
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <Iconify icon="bi:three-dots-vertical" className="w-6 h-6 text-blue" />
      </div>

      {/* Dropdown Items */}
      {isOpen && (
        <div
          className={`absolute overflow-hidden bg-white w-48 rounded-2xl right-2 z-10 shadow-lg text-nowrap ${paginatedData && paginatedData.length - index <= 2 ? "bottom-0" : ""}
`}
        >
          {(invoices ? appointmentOptions : blockOptions).map((item, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(item.name, item.route)}
              className={`p-2 cursor-pointer ${
                index <
                (invoices ? appointmentOptions : blockOptions).length - 1
                  ? "border-b border-light-gray"
                  : ""
              }`}
            >
              <div
                className={`${styling} flex items-center py-2 px-4 rounded-lg relative bg-white ${
                  invoices
                    ? "hover:bg-blue hover:text-white"
                    : "hover:bg-red hover:text-white"
                } text-gray`}
              >
                <Typography size="md" className="font-semibold">
                  {item.name}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Block Modal */}
      <Modal
        type="block"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message={
          blockPeriod === "Block for week"
            ? `Are you sure you want to block this ${type} for a week?`
            : blockPeriod === "Block for month"
              ? `Are you sure you want to block this ${type} for a month?`
              : `Are you sure you want to block this ${type} permanently?`
        }
      />
    </div>
  );
};

export default CustomDropdown;
