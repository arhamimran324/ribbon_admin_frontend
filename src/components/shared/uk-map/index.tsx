// Import the UK map data
import { ukCountriesMerc } from "@react-jvectormap/unitedkingdomcountries";
import dynamic from "next/dynamic";
import React from "react";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }, // Disable server-side rendering for this map
);

const countries: { [key: string]: number } = { ENG: 1, SCT: 1, WLS: 1, NIR: 1 };

const UKMap: React.FC = () => {
  return (
    <div className="w-full h-[270px]">
      <VectorMap
        map={ukCountriesMerc}
        backgroundColor="white"
        zoomOnScroll={false}
        panOnDrag={false}
        series={{
          regions: [
            {
              values: countries,
              attribute: "fill",
              scale: ["#316E9D"],
              normalizeFunction: "polynomial",
            },
          ],
        }}
        regionStyle={{
          initial: { fill: "#EDEDED", stroke: "#312d2d", strokeWidth: 1 },
          hover: {
            fill: "#FFD700", // Highlight on hover
          },
        }}
      />
    </div>
  );
};

export default UKMap;
