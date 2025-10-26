"use client";

import React from "react";

import BarChart from "@/components/shared/charts/horizontal-bar-chart";
import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";
import UKMap from "../uk-map";

interface DataByCitiesCardProps {
  title?: string;
  mapComponent?: React.ReactNode;
  chartData: number[];
  chartLabels: string[];
}

const DataByCitiesCard: React.FC<DataByCitiesCardProps> = ({
  title = "Overall Users By Cities",
  chartData,
  chartLabels,
}) => {
  return (
    <Container styling="p-4">
      <Typography size={"md"} className="text-gray font-semibold">
        {title}
      </Typography>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[50%] h-96 flex justify-center items-center">
          <UKMap />
        </div>
        <div className="w-full lg:w-[50%]">
          <BarChart data={chartData} labels={chartLabels} />
        </div>
      </div>
    </Container>
  );
};

export default DataByCitiesCard;
