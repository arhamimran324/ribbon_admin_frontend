import { useRouter } from "next/navigation";
import React, { useState } from "react";

import AreaChart from "@/components/shared/charts/area-chart";
import PieChart from "@/components/shared/charts/pie-chart";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import DateRangeDropdown from "@/components/shared/date-range-dropdown";
import Iconify from "@/components/shared/iconify";
import RangeCalender from "@/components/shared/range-calender";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { content } from "@/data";

interface TableBodyRowProps {
  id: string;
  purchasedOn: string;
  time: string;
  quantity: number; // Updated to match the data type
  expiry: string;
  dataType: string;
  amount: string;
}

const columns = [
  {
    id: "purchasedOn",
    label: "Purchased On",
    selector: (row: any) => row.purchasedOn,
    sortable: true,
  },
  {
    id: "time",
    label: "Time",
  },
  {
    id: "quantity",
    label: "Quantity",
    selector: (row: any) => row.quantity,
    sortable: true,
  },
  {
    id: "expiry",
    label: "Expiry",
    selector: (row: any) => row.expiry,
    sortable: true,
  },
  {
    id: "dataType",
    label: "Data Type",
    selector: (row: any) => row.dataType,
    sortable: true,
  },
  {
    id: "amount",
    label: "Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    id: "action",
    label: "Action",
  },
];

const PurchasedDataTab = () => {
  const chartData = {
    series: [37, 63],
    labels: ["Complete Dataset", "Non Clinical"],
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalItems = content.purchasedDataofPhrama.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const meta = {
    totalItems,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages,
  };

  const [filteredData, setFilteredData] = useState(
    content.purchasedDataofPhrama,
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const router = useRouter();

  const filterAppointments = (filter: string) => {
    if (filter === "All") {
      setFilteredData(content.purchasedDataofPhrama);
    } else {
      const filtered = content.purchasedDataofPhrama.filter(
        (row) => row.dataType.toLowerCase() === filter.toLowerCase(),
      );
      setFilteredData(filtered);
    }
    setSelectedFilter(filter);
  };

  const filterByDateRange = (filteredRows: TableBodyRowProps[]) => {
    setFilteredData(filteredRows);
    setCurrentPage(1);
  };
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Stats charts */}
      <div className=" w-full flex flex-col lg:flex-row gap-4">
        {/* Line Chart */}
        <div className="w-full lg:w-[68%]">
          <Container styling="">
            <div className="flex flex-col gap-2 border border-light-gray pt-4 px-4 rounded-lg">
              <div className="flex justify-between items-center">
                <Typography
                  size="md"
                  className="text-secondary-text-gray font-semibold pl-4"
                >
                  Total Spent
                </Typography>
                <RangeCalender />
              </div>
              <AreaChart
                showDollarSign
                seriesData={content.purchasedDataChartData.series}
                categoriesData={content.purchasedDataChartData.categories}
              />
            </div>
          </Container>
        </div>
        {/* Pie Chart */}
        <div className="w-full lg:w-[32%]">
          <Container styling="p-4 flex flex-col">
            <div className="flex justify-between items-center pb-4">
              <Typography size="md" className="text-gray font-semibold">
                Total Purchased Data
              </Typography>
              <RangeCalender />
            </div>
            <PieChart series={chartData.series} labels={chartData.labels} />
          </Container>
        </div>
      </div>
      <hr className="text-light-gray mt-[2px]" />
      {/* List of Purchased Data */}
      <div className="flex flex-col gap-4">
        <Typography
          size="h4"
          className="text-blue leading-none font-bold flex justify-start items-center"
        >
          List of Purchased Data
        </Typography>
        <Container>
          <div className="flex flex-col lg:flex-row justify-center gap-2 p-4">
            <div className="w-full flex flex-col md:flex md:flex-row gap-2">
              <div className="">
                <SearchInput />
              </div>
              <div className="">
                <DateRangeDropdown
                  title="Date Range"
                  data={content.purchasedDataofPhrama}
                  filterKey="expiry"
                  onFilter={filterByDateRange}
                />
              </div>
            </div>
            <div className="w-full xl:w-fit md:md:flex md:flex-row flex flex-col justify-end items-center gap-2 ">
              {["All", "Complete Dataset", "Non Clinical"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => filterAppointments(filter)}
                  className={`w-full md:w-auto px-5 py-3 rounded-lg border text-md text-wrap md:text-nowrap ${
                    selectedFilter === filter
                      ? "border-blue text-blue"
                      : "border-light-gray text-gray"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <DataTable
            paginate
            roundedHeader={true}
            ColumnsData={columns}
            meta={meta}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            tableRows={paginatedData.length > 0 ? paginatedData : []}
            TableBodyRow={({
              id,
              purchasedOn,
              time,
              quantity,
              expiry,
              dataType,
              amount,
            }: TableBodyRowProps) => (
              <tr className="font-semibold text-dark-charcoal border-b border-light-gray text-nowrap">
                <td className="text-start px-4 lg:px-6 py-4">
                  <Typography size="md" className="font-normal">
                    {purchasedOn || "-"}
                  </Typography>
                </td>
                <td className="text-start px-4 lg:px-6 py-4">
                  <Typography size="md" className="font-normal">
                    {time || "-"}
                  </Typography>
                </td>
                <td className="text-start px-4 lg:px-6 py-4">
                  <Typography size="md" className="font-normal">
                    {quantity || "-"}
                  </Typography>
                </td>
                <td className="text-start px-4 lg:px-6 py-4">
                  <Typography size="md" className="font-normal">
                    {expiry || "-"}
                  </Typography>
                </td>
                <td className="text-start px-4 lg:px-6 py-4">
                  <Typography size="md" className="font-normal">
                    {dataType || "-"}
                  </Typography>
                </td>
                <td className="text-start px-4 lg:px-6 py-4">
                  <div className="flex justify-start">
                    <Typography
                      size="md"
                      className={`!m-0 py-2 w-28 text-center rounded-lg ${
                        parseFloat(amount?.replace(/[^0-9.-]+/g, "")) >= 0
                          ? "bg-[#D9F6DA] text-[#098B0D]"
                          : "bg-[#FFDEDE] text-[#C9311A]"
                      }`}
                    >
                      {amount || "-"}
                    </Typography>
                  </div>
                </td>
                <td className="text-center pr-4 lg:pr-6 py-4">
                  <Iconify
                    className="cursor-pointer"
                    icon="mdi:eye"
                    color="#316E9D"
                    width="20px"
                    height="20px"
                    onClick={() => {
                      if (dataType === "Non Clinical") {
                        router.push(
                          `/crm/pharmaceutical/pharma-company/single-pharma/non-clinical-data/${id}`,
                        );
                      } else {
                        router.push(
                          `/crm/pharmaceutical/pharma-company/single-pharma/complete-dataset/${id}`,
                        );
                      }
                    }}
                  />
                </td>
              </tr>
            )}
          />
        </Container>
      </div>
    </div>
  );
};

export default PurchasedDataTab;
