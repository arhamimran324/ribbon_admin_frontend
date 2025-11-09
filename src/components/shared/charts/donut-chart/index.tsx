"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DonutChartProps {
  height?: any;
  data: {
    female?: any;
    male?: any;
    name: string;
    value: number;
    color: string;
  }[];
  isCompleteDataset?: boolean;
  insideLabel?: string;
  clinicalSpeciality?: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  height,
  data,
  isCompleteDataset,
  insideLabel,
}) => {
  const totalData = data.reduce((acc, item) => acc + item.value, 0);
  // const totalMale = data.reduce((acc, item) => acc + (item.male || 0), 0);
  // const totalFemale = data.reduce((acc, item) => acc + (item.female || 0), 0);

  // Calculate legend row configuration based on dataset size
  const getItemMargin = () => {
    if (data.length >= 8) {
      return {
        horizontal: 5,
        vertical: 4,
      };
    }
    return {
      horizontal: 10,
      vertical: 4,
    };
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    labels: data.map((item) => item.name),
    colors: data.map((item) => item.color),
    stroke: {
      show: false,
    },
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "12px",
      itemMargin: getItemMargin(),
      formatter: (label: string) => label,
      markers: {
        strokeWidth: 0,
        offsetX: -2,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex }) {
        const item = data[seriesIndex];
        if (isCompleteDataset) {
          return `<div class="apexcharts-tooltip-box" style="background: ${item.color}; color: white; padding: 4px; border-radius: 4px; width: 100px;
            min-width: 100px;
            text-align: center;">
            <div>${item.name}</div>
            <div>${item.male} Male</div>
            <div>${item.female} Female</div>
          </div>`;
        }
        return `<div class="apexcharts-tooltip-box" style="background: ${item.color}; color: white; padding: 8px; border-radius: 4px;">
          <div style="font-weight: bold;">${item.name}</div>
          <div>£${series[seriesIndex]}</div>
        </div>`;
      },
      style: {
        fontSize: "12px",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: -10,
              color: "#000",
              fontSize: "14px",
              fontWeight: isCompleteDataset ? "bold" : "normal",
            },
            value: {
              show: true,
              offsetY: 10,
              formatter: () => `${totalData}`,
              color: "#000",
              fontSize: "32px",
              fontWeight: "bold",
            },
            total: {
              show: true,
              showAlways: true,
              label: insideLabel,
              color: "#969696",
              fontSize: "14px",
              fontWeight: "semi-bold",
              formatter: () => `£${totalData}`,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  name: {
                    fontSize: "10px",
                  },
                  value: {
                    fontSize: "18px",
                  },
                },
              },
            },
          },
          legend: {
            fontSize: "10px",
            itemMargin: {
              horizontal: 5,
              vertical: 2,
            },
          },
        },
      },
    ],
  };

  const chartSeries = data.map((item) => item.value);

  return (
    <>
      {/* {title && (
        <div className="flex justify-start items-center px-5 py-3">
          <Typography size="md" className="font-semibold text-gray">
            {!clinicalSpeciality && title}
          </Typography>
        </div>
      )} */}
      <div className="">
        {chartSeries.length > 0 && (
          <div className="">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={height ? height : 260}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DonutChart;
