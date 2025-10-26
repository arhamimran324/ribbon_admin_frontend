import React from "react";

import DonutChart from "@/components/shared/charts/donut-chart";
import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";
import { content } from "@/data";

const ClinicalSpecialityDonutChart = () => {
  return (
    <Container styling="py-6 px-4 md:px-10 flex flex-col gap-1.5">
      <div>
        <Typography size="md" className="text-gray font-semibold text-start">
          Clinical Specialty
        </Typography>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center md:items-center gap-10">
        {/* Legends */}
        <div className="relative flex flex-col md:flex-row w-full lg:w-[60%] gap-2 md:gap-10 h-[170px]">
          {/* Combined Scrollable Legends */}
          <div className="relative flex flex-1 flex-col space-y-2 md:space-y-0 md:flex-row gap-2 md:gap-10 overflow-y-auto max-h-[18rem] md:max-h-[18rem]">
            {/* Left Column */}
            <div className="flex-1 flex flex-col space-y-2 md:border-r border-light-gray md:pr-12">
              {content.clinicalSpeciality.slice(0, 16).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-8 lg:space-x-2 xl:space-x-10"
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-dark-charcoal font-normal text-md max-w-[8rem] truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-gray text-sm text-right font-medium">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col space-y-2 lg:border-r border-light-gray md:pr-12">
              {content.clinicalSpeciality.slice(16).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-8 lg:space-x-2 xl:space-x-10"
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-dark-charcoal font-normal text-md max-w-[8rem] truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-gray text-sm text-right font-medium">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <DonutChart
            data={content.clinicalSpeciality}
            insideLabel="Downloads"
            clinicalSpeciality
          />
        </div>
      </div>
    </Container>
  );
};

export default ClinicalSpecialityDonutChart;
