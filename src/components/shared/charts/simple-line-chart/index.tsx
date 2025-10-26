"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { FC } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartData {
  xAxis: string[];
  yAxis: number[];
}

interface BasicLineChartProps {
  data: ChartData;
  lineColor?: string;
  width?: any;
}

const BasicLineChart: FC<BasicLineChartProps> = ({
  data,
  width,
  lineColor,
}) => {
  const isEmpty = !data?.yAxis || data.yAxis.length === 0;
  const fallbackSeries = [{ data: [0] }];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 90,
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: [lineColor || "#00CFFF"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: [lineColor || "#00CFFF"],
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 768, // Tablet
        options: {
          chart: {
            height: 70,
          },
          stroke: {
            width: 2,
          },
        },
      },
      {
        breakpoint: 480, // Mobile
        options: {
          chart: {
            height: 50,
          },
          stroke: {
            width: 1.5,
          },
        },
      },
    ],
  };

  const series = isEmpty
    ? fallbackSeries
    : [
        {
          data: data.yAxis,
        },
      ];

  return (
    <div className="">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={90}
        width={width ? width : 60}
      />
    </div>
  );
};

export default BasicLineChart;
