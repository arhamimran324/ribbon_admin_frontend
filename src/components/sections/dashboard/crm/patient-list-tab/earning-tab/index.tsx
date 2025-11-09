import React, { useState } from "react";

import AreaChart from "@/components/shared/charts/area-chart";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import DateRangeDropdown from "@/components/shared/date-range-dropdown";
import RangeCalender from "@/components/shared/range-calender";
import TotalEarningsCard from "@/components/shared/total-earning-card";
import { Typography } from "@/components/shared/typography";
import { earningChartData, earningsTableData } from "@/data";

interface EarningsRow {
  _id: string;
  earningThrough: string;
  date: string;
  time: string;
  earnings: number;
}

const earningsTableColumns = [
  { id: "earningThrough", label: "Earning Through" },
  { id: "date", label: "Date", sortable: true },
  { id: "time", label: "Time" },
  { id: "earnings", label: "Earnings", sortable: true },
];

const EarningTab: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] =
    useState<EarningsRow[]>(earningsTableData);

  const meta = {
    totalItems: filteredData.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredData.length / rowsPerPage),
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col gap-6 overflow-hidden w-full">
      {/* Line Chart and Total Earnings */}
      <Container styling="w-full flex flex-col sm:flex-row justify-between gap-4 md:p-[30px] p-4">
        <div className="w-full lg:w-[60%]">
          <div className="flex flex-col gap-2 border border-light-gray pt-4 md:px-4 px-2 rounded-[16px]">
            <div className="flex justify-end items-center">
              <RangeCalender position="md:left-0" />
            </div>
            <AreaChart
              seriesData={earningChartData?.chart?.series || []}
              categoriesData={earningChartData?.chart?.categories || []}
            />
          </div>
        </div>
        <div className="w-full lg:w-[40%]">
          <TotalEarningsCard total={3700} withdrawal={1500} pending={2200} />
        </div>
      </Container>

      {/* Date Range Button and Data Table */}
      <Container>
        <div className="w-full flex justify-center md:justify-end p-4">
          <div className="w-full md:w-auto">
            <DateRangeDropdown
              title="Date Range"
              data={earningsTableData}
              filterKey="date"
              onFilter={setFilteredData}
            />
          </div>
        </div>
        <DataTable
          paginate
          roundedHeader={true}
          ColumnsData={earningsTableColumns}
          tableRows={paginatedData}
          rowsPerPage={rowsPerPage}
          meta={meta}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          TableBodyRow={({
            _id,
            earningThrough,
            date,
            time,
            earnings,
          }: EarningsRow) => (
            <tr
              key={_id}
              className="text-nowrap text-start border-b border-light-gray text-md"
            >
              <td className="px-4 lg:px-6 py-4">{earningThrough}</td>
              <td className="px-4 lg:px-6 py-4">
                {new Date(date).toLocaleDateString()}
              </td>
              <td className="px-4 lg:px-6 py-4">{time}</td>
              <td className="px-4 lg:px-6 py-4">
                <div className="flex justify-start">
                  <Typography
                    size="md"
                    className="text-[#098B0D] text-center !py-2 px-4 bg-[#D9F6DA] font-normal rounded-md"
                  >
                    + £{earnings}
                  </Typography>
                </div>
              </td>
            </tr>
          )}
        />
      </Container>
    </div>
  );
};

export default EarningTab;
