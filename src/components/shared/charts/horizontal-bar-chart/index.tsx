import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { FC, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartData {
  series: { data: number[] }[];
  options: ApexOptions;
}
interface BarChartProps {
  data: number[];
  labels: string[];
  roundedBar?: boolean;
  tenSeries?: boolean;
  height?: number;
}

const BarChart: FC<BarChartProps> = ({
  data,
  labels,
  roundedBar,
  tenSeries,
  height,
}) => {
  const [chartData] = useState<ChartData>({
    series: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: "100%",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: roundedBar ? 3 : 0,
          horizontal: true,
          borderRadiusApplication: "end",
          colors: {
            ranges: [
              {
                from: 0,
                to: Math.max(...data),
                color: "#316E9D",
              },
            ],
            backgroundBarColors: ["#ededed"],
            backgroundBarOpacity: 1,
          },
          barHeight: "14px",
        },
      },
      colors: ["#316E9D"],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labels,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#969696",
          },
        },
        tickAmount: tenSeries ? 10 : Math.ceil(Math.max(...data) / 20),
        min: 0,
        max: 100,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#969696",
          },
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const value = series[seriesIndex][dataPointIndex];
          const seriesColor = w.globals.colors[seriesIndex];

          return `
            <div style="
              display: flex;
              justify-content: center;
              align-items: center; 
              color: white;
              align-items: center;
              min-width: 70px;
              padding: 5px 10px;
              background: ${seriesColor} !important; 
              border-radius: 8px;
              // box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">
          
              <span style="font-size: 12px; font-weight: bold;">${value} </span>
            </div>
          `;
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={height ? height : 400}
      />
    </div>
  );
};

export default BarChart;
