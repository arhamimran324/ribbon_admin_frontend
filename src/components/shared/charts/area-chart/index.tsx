import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface AreaChartProps {
  seriesData?: Array<{
    name: string;
    data: number[];
  }>;
  categoriesData: string[];
  showDollarSign?: boolean;
  label?: string;
  showLegend?: boolean;
  height?: any;
}

const AreaChart: React.FC<AreaChartProps> = ({
  seriesData,
  categoriesData,
  showDollarSign,
}) => {
  const maxValue =
    seriesData && seriesData.length > 0
      ? Math.max(...seriesData.flatMap((series) => series.data))
      : 0;
  const chartOptions: ApexOptions = {
    chart: {
      height: "auto",
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      position: "bottom",
      type: "category",
      categories: categoriesData,

      labels: {
        style: {
          colors: "#A6A6A6",
        },
      },

      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: maxValue,
      labels: {
        show: false,
        formatter: (value: number) => {
          if (value === 0) {
            return `< ${showDollarSign ? `£${value}` : `${value}`}`;
          } else if (value === maxValue) {
            return `${showDollarSign ? `£${value}` : `${value}`} >`;
          }
          return showDollarSign ? `£${value}` : `${value}`;
        },
        style: {
          colors: "#A6A6A6",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: true,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      followCursor: true,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        if (seriesIndex === undefined || dataPointIndex === undefined)
          return "";

        const value = w.globals.series[seriesIndex][dataPointIndex];
        const monthIndex = w.globals.labels[dataPointIndex];
        const seriesColor = w.globals.colors[seriesIndex];

        const monthNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Suns"];
        const month = monthNames[parseInt(monthIndex) - 1] || monthIndex;

        return `
      <div style="
        background: ${seriesColor} !important;
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
          
      min-width: 121px;
        font-family: Arial, sans-serif;
        text-align: left;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      ">
       <div style="font-weight: normal;
       font-size: 10px;
       ">This Week</div>
        <div style="font-weight: bold;">${showDollarSign ? `£${value}` : value}</div>
        <div style="font-size: 12px;">${month}</div>
      </div>`;
      },
    },

    colors: ["#D5A581", "#A6A6A6"],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "right",
      floating: true,
      fontSize: "14px",
      fontWeight: 600,
      labels: {
        colors: "#A6A6A6",
      },
      offsetY: -6,
    },
    fill: {
      opacity: 0.1,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "top",
            horizontalAlign: "left",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="area"
        height="100%"
      />
    </div>
  );
};

export default AreaChart;
