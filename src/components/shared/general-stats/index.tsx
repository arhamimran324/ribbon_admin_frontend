import React from "react";

import Container from "@/components/shared/container";
import { content } from "@/data";
import StatsCard from "../../sections/dashboard/stats-card";
import DonutChartComponent from "../donut-chart-component";
import { Typography } from "../typography";

const GeneralStats = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {content.statsCardData.slice(0, 4).map((data, index) => (
          <Container key={index}>
            <StatsCard
              title={data.title}
              value={data.value}
              percentage={data.percentage}
              icon={data.icon}
              negative={data.negative}
              data={{
                xAxis: data.xAxis,
                yAxis: data.yAxis,
              }}
              lineColor={data.lineColor}
            />
          </Container>
        ))}
      </div>
      <div className="w-full lg:w-[55%] xl:w-[45%] flex justify-center items-center">
        <Container>
          <div className="w-full">
            <div className="px-6 pt-4 flex justify-start items-center">
              <Typography size="md" className="text-gray font-semibold">
                Total Earnings
              </Typography>
            </div>
            <DonutChartComponent
              data={content.earningsData}
              insideLabel="Patients"
              height={247}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default GeneralStats;
