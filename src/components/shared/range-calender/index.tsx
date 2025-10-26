"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { toast } from "react-toastify";

import { Button } from "../button";
import Container from "../container";
import Iconify from "../iconify";
import InputTextField from "../input-fields/input-text-field";
import { Typography } from "../typography";

interface RangeCalenderProps {
  position?: string;
}
const rangeDate = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Yearly", value: "yearly" },
];

const RangeCalender: React.FC<RangeCalenderProps> = ({ position }) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [ranges, setRanges] = useState("weekly");
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [values, setValues] = useState([
    new DateObject(),
    new DateObject().add(6, "days"),
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setCalendarVisible(false);
      }
    };

    // Only add the event listener when the calendar is visible
    if (isCalendarVisible) {
      // Use capture phase to ensure we handle the event before it bubbles
      document.addEventListener("mousedown", handleOutsideClick, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [isCalendarVisible]);

  const handleToggleCalendar = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCalendarVisible((prev) => !prev);
  };

  const handleDateChange = (selectedDates: DateObject[]) => {
    if (ranges === "quarterly") {
      if (selectedDates.length === 2) {
        // Ensure that only a three-month range is allowed
        const startMonth = selectedDates[0].month.index;
        const endMonth = selectedDates[1].month.index;

        const diff = endMonth - startMonth + 1;

        if (diff === 3) {
          setValues(selectedDates);
        } else {
          toast.info("Please select exactly 3 consecutive months.");
          setValues([]);
        }
      } else if (selectedDates.length < 2) {
        setValues(selectedDates);
      } else {
        toast.info("Please select a valid range.");
        setValues([]);
      }
    } else if (ranges === "weekly") {
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0].toDate();
        const endDate = selectedDates[1].toDate();

        const diff = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (diff <= 6) {
          setValues(selectedDates);
        } else {
          toast.info("Please select a range between 1 to 7 days.");
          setValues([]);
        }
      } else {
        setValues(selectedDates);
      }
    } else if (ranges === "monthly") {
      if (selectedDates.length >= 1) {
        setValues([selectedDates[selectedDates.length - 1]]);
      } else {
        setValues([]);
      }
    } else if (ranges === "yearly") {
      if (selectedDates.length >= 1) {
        setValues([selectedDates[selectedDates.length - 1]]);
      } else {
        setValues([]);
      }
    }
  };

  const handleRange = (value: string) => {
    setRanges(value);
    if (value === "weekly") {
      const startDate = new DateObject();
      setValues([startDate, startDate.add(6, "days")]);
    } else {
      setValues([]);
      setFromDate("");
      setToDate("");
    }
  };

  useEffect(() => {
    if (values && values.length === 2) {
      const format =
        ranges === "yearly"
          ? "YYYY"
          : ranges === "quarterly"
            ? "MMMM YYYY"
            : ranges === "monthly"
              ? "MMMM YYYY"
              : "YYYY-MM-DD";

      setFromDate(values[0].format(format));
      setToDate(values[1].format(format));
    } else if (values && values.length === 1 && ranges === "yearly") {
      const format = "YYYY";
      setFromDate(values[0].format(format));
      setToDate(values[0].format(format));
    } else if (values && values.length === 1 && ranges === "monthly") {
      const format = "MMMM YYYY";
      setFromDate(values[0].format(format));
      setToDate(values[0].format(format));
    } else if (values && values.length === 3 && ranges === "quarterly") {
      const format = "MMMM YYYY";
      setFromDate(values[0].format(format));
      setToDate(values[2].format(format));
    }
  }, [values, ranges]);

  return (
    <div className="relative flex flex-col gap-1 rounded-xl" ref={containerRef}>
      <button
        onClick={handleToggleCalendar}
        className="flex gap-2 justify-between items-center border border-light-gray rounded-lg py-1.5 px-3"
      >
        <Typography size="md" className="text-gray font-semibold">
          {rangeDate.find((item) => item.value === ranges)?.label}
        </Typography>
        <Iconify
          icon={
            isCalendarVisible
              ? "solar:alt-arrow-up-linear"
              : "solar:alt-arrow-down-linear"
          }
          width={20}
          color="#969696"
        />
      </button>
      {isCalendarVisible && (
        <div
          className={`bg-white absolute -right-2 lg:right-[10px] top-full z-50 w-[265px] sm:w-[400px] min-w-4xl ${position}`}
        >
          <Container styling="p-0 w-full">
            <ul className="grid grid-cols-2 gap-3 text-gray p-4 sm:flex sm:justify-between sm:items-center">
              {rangeDate.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer text-md font-semibold px-4 py-2 text-center ${
                    ranges === item.value ? "bg-blue text-white rounded-xl" : ""
                  }`}
                  onClick={() => handleRange(item.value)}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <hr className="text-light-gray" />

            {ranges === "weekly" && (
              <>
                <div className="flex flex-col sm:flex-row items-center p-4 sm:justify-between gap-1 md:gap-3">
                  <InputTextField
                    value={fromDate}
                    placeholder="From"
                    styling="rounded-[30px] !py-2 !text-md"
                    disabled
                  />
                  <div className="text-gray">-</div>
                  <InputTextField
                    value={toDate}
                    placeholder="To"
                    styling="rounded-[30px] item-center !py-2 !text-md"
                    disabled
                  />
                </div>
                <hr className="text-light-gray" />
              </>
            )}

            <div className="p-4 w-full">
              <Calendar
                value={values}
                onChange={handleDateChange}
                range={ranges === "weekly" || ranges === "quarterly"}
                rangeHover={ranges === "weekly" || ranges === "quarterly"}
                onlyMonthPicker={ranges === "quarterly" || ranges === "monthly"}
                onlyYearPicker={ranges === "yearly"}
                highlightToday={ranges === "weekly" ? true : false}
                className="w-full !shadow-none"
              />
              <div className="flex justify-end items-center pt-2 gap-2">
                <Button variant="outlined" className="">
                  Reset
                </Button>
                <Button variant="secondary" className="">
                  Apply
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default RangeCalender;
