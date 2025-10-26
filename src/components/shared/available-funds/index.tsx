import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import RangeCalender from "@/components/shared/range-calender";
import { Typography } from "@/components/shared/typography";
import Container from "../container";
import Tooltip from "../tool-tip";

interface SectionDetail {
  label: string;
  value: string;
  tooltip?: string;
}

interface Section {
  title: string;
  details: SectionDetail[];
  tooltip?: string;
}

interface AvailableFundsProps {
  fundsData: {
    availableFunds: Section;
    futurePayments: Section;
    earningsExpenses: Section;
  };
}

const AvailableFunds = ({ fundsData }: AvailableFundsProps) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      if (activeTooltip !== null) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeTooltip]);

  const sections = [
    fundsData.availableFunds,
    fundsData.futurePayments,
    fundsData.earningsExpenses,
  ];

  return (
    <Container>
      <div className="flex justify-end p-4">
        <RangeCalender position="" />
      </div>
      <div className="w-full px-6 pb-6 flex flex-col lg:flex-row gap-4 text-nowrap">
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`w-full lg:w-1/3 flex flex-col gap-4 relative ${
              sectionIndex < sections.length - 1
                ? "lg:border-r lg:border-light-gray lg:pr-6"
                : "lg:pl-0"
            }`}
          >
            {/* Section Header */}
            <div className="flex flex-col justify-center items-start lg:flex-row lg:items-center lg:justify-between gap-2 text-left">
              <div className="flex justify-center items-center gap-2">
                <Typography size="lg" className="font-bold text-blue">
                  {section.title}
                </Typography>
                {section?.tooltip && (
                  <Tooltip message={section?.tooltip} trigger="hover">
                    <Icon
                      icon="mdi:information-outline"
                      width={16}
                      height={16}
                      className="text-gray cursor-pointer"
                    />
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Section Details */}
            <div className="flex flex-col gap-2">
              {section.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex flex-col">
                  <div className="flex items-start gap-2">
                    <Typography size="sm" className="text-gray font-semibold">
                      {detail.label}
                    </Typography>
                    {detail.tooltip && (
                      <Tooltip message={detail.tooltip} trigger="hover">
                        <Icon
                          icon="mdi:information-outline"
                          width={16}
                          height={16}
                          className="text-gray cursor-pointer"
                        />
                      </Tooltip>
                    )}
                  </div>
                  <Typography
                    size="h4"
                    className="font-bold text-dark-charcoal"
                  >
                    {detail.value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AvailableFunds;
