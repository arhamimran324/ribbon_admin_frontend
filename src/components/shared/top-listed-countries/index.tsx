import Image from "next/image";
import React, { FC } from "react";

import Container from "../container";
import { Typography } from "../typography";

interface CountryStats {
  country: string;
  flag: string;
  patients: number;
  pharmaCompanies: number;
  pharmacies: number;
  clinics: number;
}

interface TopListedCountriesTable {
  data: CountryStats[];
}

const columns = [
  {
    id: "country",
    label: "Countries",
    align: "left",
    render: (item: CountryStats) => (
      <div className="flex items-center gap-3">
        <Image src={item.flag} alt={`Flag`} width={20} height={15} />
        <Typography className="font-semibold text-dark-charcoal" size="md">
          {item.country}
        </Typography>
      </div>
    ),
  },
  {
    id: "patients",
    label: "Patients",
    align: "center",
    render: (item: CountryStats) => (
      <Typography className="font-semibold text-dark-charcoal" size="md">
        {item.patients}
      </Typography>
    ),
  },
  {
    id: "pharmaCompanies",
    label: "Pharma Companies",
    align: "center",
    render: (item: CountryStats) => (
      <Typography className="font-semibold text-dark-charcoal" size="md">
        {item.pharmaCompanies}
      </Typography>
    ),
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    align: "center",
    render: (item: CountryStats) => (
      <Typography className="font-semibold text-dark-charcoal" size="md">
        {item.pharmacies}
      </Typography>
    ),
  },
  {
    id: "clinics",
    label: "Clinics",
    align: "center",
    render: (item: CountryStats) => (
      <Typography className="font-semibold text-dark-charcoal" size="md">
        {item.clinics}
      </Typography>
    ),
  },
];

const TopListedCountriesTable: FC<TopListedCountriesTable> = ({ data }) => {
  return (
    <Container styling="overflow-auto rounded-[16px]">
      <div className="px-4 py-5">
        <Typography size="md" className="text-gray font-semibold">
          Top Installed Countries
        </Typography>
      </div>
      <table className="w-full border-collapse bg-white">
        <thead className="bg-gradient-blue text-white text-lg">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.id}
                className={`p-4 font-semibold text-white text-nowrap ${column.align === "center" ? "text-center" : "text-left"} ${
                  index === 0 ? "rounded-l-lg" : ""
                } ${index === columns.length - 1 ? "rounded-r-lg" : ""}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.country}>
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={`py-4 px-6 sm:px-4 border-r border-light-gray text-dark-charcoal text-nowrap ${column.align === "center" ? "text-center" : ""}`}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default TopListedCountriesTable;
