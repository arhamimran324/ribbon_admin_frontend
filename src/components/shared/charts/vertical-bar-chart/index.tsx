import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { FC, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  bmi?: boolean;
  offsetY?: any;
  seriesData: { data: number[] }[];
  categories: any[];
  horizontal?: boolean;
  label?: string;
  hieght?: any;
  showLegend?: boolean;
  borderRadius?: number;
  borderRadiusApplication?: any;
}

interface ChartData {
  series: { data: number[] }[];
  options: ApexOptions;
}

const VerticlBarChart: FC<Props> = ({
  bmi,
  seriesData,
  categories,
  horizontal,
  label,
  hieght,
  offsetY,
  showLegend,
  borderRadius,
  borderRadiusApplication,
}) => {
  const [chartData] = useState<ChartData>({
    series: seriesData,
    options: {
      chart: {
        type: "bar",
        height: hieght ? hieght : 430,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: horizontal ? true : false,
          columnWidth:
            seriesData.length === 1
              ? "60%"
              : seriesData.length > 2
                ? "60%"
                : "40%",
          dataLabels: {
            position: "top",
          },
          borderRadius: borderRadius,
          borderRadiusApplication: borderRadiusApplication
            ? borderRadiusApplication
            : "end",
        },
      },
      grid: {
        show: horizontal || bmi ? false : true,
      },

      responsive: [
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "40%",
              },
            },
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "60%",
              },
            },
            chart: {
              height: 250,
            },
          },
        },
      ],
      colors: ["#316E9D", "#30CFD0", "#7732CC"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const value = w.globals.series[seriesIndex][dataPointIndex];
          const seriesColor = w.globals.colors[seriesIndex];

          return `<div style="
          background: ${seriesColor} !important;
      color: white !important;
      padding: 8px 12px;
      border-radius: 8px;
      min-width: 100px;
      border: none !important;
      box-shadow: none !important;
          ">
            <div style="display: flex; align-items: center; justify-content: center;">
              <span>${bmi ? `${value}%` : value}</span>
            </div>
          </div>`;
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: "#969696",
          },
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: "#969696",
          },
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },

      legend: {
        show: showLegend,
        position: "top",
        horizontalAlign: "right",
        offsetX: 40,
        offsetY: offsetY ? offsetY : 21,
        fontSize: "12px",
        markers: {
          shape: "circle",
          offsetX: -5,
        },

        itemMargin: {
          horizontal: 10,
        },
      },
      annotations: {
        texts: [
          {
            x: 55,
            y: 40,
            text: label,
            textAnchor: "center",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "Arial",
            foreColor: "#969696",
          },
        ],
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={hieght ? hieght : 430}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default VerticlBarChart;
