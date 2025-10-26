/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

// import BasicLineChart from '@/components/shared/charts/simple-line-chart';
import Iconify from "@/components/shared/iconify";
import { Typography } from "@/components/shared/typography";

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  icon?: string;
  data?: {
    xAxis: string[];
    yAxis: number[];
  };
  lineColor?: string;
  styling?: string;
  negative?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentage,
  styling,
  negative,
}) => {
  return (
    <div
      className={`grid grid-cols-1 xs:grid-cols-2 gap-4 items-center w-full ${styling}`}
    >
      <div className="flex flex-col justify-center items-start">
        <Typography
          size="md"
          className="text-secondary-text-gray font-semibold text-wrap xs:text-nowrap"
        >
          {title}
        </Typography>
        <Typography size="h3" className="text-primary-text font-bold">
          {value}
        </Typography>
        <Typography size="sm" className="flex items-center">
          <span>
            <Iconify
              height="25"
              width="25"
              icon={negative ? "uil:arrow-down" : "uil:arrow-up"}
              className={`${negative ? "text-red" : "text-primary-light"}`}
            />
          </span>
          <span className="flex items-center gap-1">
            <span
              className={`${negative ? "text-red" : "text-primary-light"} "font-semibold"`}
            >
              {percentage}
            </span>
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default StatsCard;
