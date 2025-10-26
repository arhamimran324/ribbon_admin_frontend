import React, { FC } from "react";

import DonutChart from "../charts/donut-chart";

interface DonutChartComponentProps {
  data: any;
  height?: number;
  insideLabel: string;
  isCompleteDataset?: boolean;
}

const DonutChartComponent: FC<DonutChartComponentProps> = ({
  data,
  insideLabel,
  height,
  isCompleteDataset,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Donut Chart */}
      <DonutChart height={height} data={data} insideLabel={insideLabel} />

      {/* Horizontal Line */}
      <div
        className={`${isCompleteDataset ? "w-[70%]" : "w-full"} border-t border-light-gray`}
      ></div>

      {/* Legends */}
      <div
        className={`grid ${data.length > 4 ? " grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xs:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"} ${isCompleteDataset ? "gap-x-2" : "gap-x-4 py-4"} gap-y-1 py-2`}
      >
        {data.map((item: any) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-[#312D2D]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartComponent;
