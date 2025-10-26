import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Button } from "../button";
import Iconify from "../iconify";

interface DateRangeDropdownProps {
  title: string;
  data: any[];
  filterKey: string;
  position?: string;
  onFilter: (filteredData: any[]) => void;
}

const DateRangeDropdown: React.FC<DateRangeDropdownProps> = ({
  title,
  data,
  filterKey,
  position,
  onFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  const parseDate = (dateString: string): Date => {
    // Parse ISO format date (yyyy-MM-dd)
    return new Date(dateString);
  };

  const filterDataByDateRange = () => {
    if (!fromDate || !toDate) {
      onFilter(data);
      return;
    }

    // Set time to start of day for fromDate and end of day for toDate
    const startDate = new Date(fromDate.setHours(0, 0, 0, 0));
    const endDate = new Date(toDate.setHours(23, 59, 59, 999));

    const filteredData = data.filter((item) => {
      const itemDate = parseDate(item[filterKey]);
      return itemDate >= startDate && itemDate <= endDate;
    });

    onFilter(filteredData);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
    onFilter(data);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current !== event.target
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const formattedRange =
    fromDate && toDate ? `${formatDate(fromDate)} - ${formatDate(toDate)}` : "";

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={handleToggleDropdown}
        className="relative w-full md:max-w-[250px] md:min-w-[215px] overflow-hidden"
      >
        <input
          ref={inputRef}
          readOnly
          value={formattedRange || title}
          className="w-full px-4 py-3 bg-white border border-light-gray rounded-lg cursor-pointer focus:outline-none truncate text-md text-secondary-text-gray"
        />
        <div className="absolute right-12 top-3.5 h-5 border-l border-light-gray"></div>
        <span className="absolute right-4 top-3.5 cursor-pointer">
          <Iconify
            icon="radix-icons:calendar"
            width={20}
            height={20}
            className="text-secondary-text-gray"
          />
        </span>
      </div>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-full md:w-[400px] flex flex-col gap-4 bg-white border border-light-gray rounded-lg px-4 py-8 z-10 shadow-md ${position}`}
        >
          <div className="w-full flex flex-col sm:flex sm:flex-row gap-2">
            <div className="w-full">
              <label className="block text-md font-medium text-gray mb-1">
                From
              </label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                dateFormat="dd/MM/yy"
                placeholderText="DD/MM/YY"
                className="w-full focus:outline-none text-md px-4 py-3 border border-light-gray rounded-lg"
                popperPlacement="bottom-end"
              />
            </div>

            <div className="w-full">
              <label className="block text-md font-medium text-gray mb-1">
                To
              </label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                dateFormat="dd/MM/yy"
                placeholderText="DD/MM/YY"
                className="w-full focus:outline-none text-md px-4 py-3 border border-light-gray rounded-lg"
                popperPlacement="bottom-end"
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row text-md justify-center items-center gap-4">
            <Button className="w-full" variant="outlined" onClick={handleClear}>
              Clear
            </Button>
            <Button
              className="w-full"
              variant="primary"
              onClick={filterDataByDateRange}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
