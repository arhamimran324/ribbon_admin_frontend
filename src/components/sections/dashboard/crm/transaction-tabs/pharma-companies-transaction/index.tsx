"use client";

import React, { useState } from "react";

import Container from "@/components/shared/container";
import CustomCheckboxSelect from "@/components/shared/custom-checkbox-select";
import DataTable from "@/components/shared/data-table";
import DateRangeDropdown from "@/components/shared/date-range-dropdown";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { content } from "@/data";

const columns = [
  { id: "companyId", label: "Company Id" },
  { id: "pharmaceuticalName", label: "Pharmaceutical Name" },
  { id: "transactionId", label: "Transaction ID" },
  { id: "details", label: "Details" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "status", label: "Status" },
  { id: "amount", label: "Amount" },
];

const PharmaCompaniesTransactionsTab = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(
    content.pharmaceuticalTransactions,
  );

  const filterData = (
    data: typeof content.pharmaceuticalTransactions,
    filters: string[],
  ) => {
    return data.filter((transaction) => {
      if (filters.length === 0) return true;

      return filters.some(
        (filter) =>
          transaction.details.toLowerCase().includes(filter.toLowerCase()) ||
          transaction.status.toLowerCase().includes(filter.toLowerCase()),
      );
    });
  };

  // Handle checkbox filter changes
  const handleFilterChange = (newFilters: string[]) => {
    setSelectedFilters(newFilters);
    setCurrentPage(1);
    setFilteredData(filterData(content.pharmaceuticalTransactions, newFilters));
  };

  const meta = {
    totalItems: filteredData.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredData.length / rowsPerPage),
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  return (
    <div className="flex flex-col gap-4">
      <Typography size="h4" className="text-blue font-bold leading-none">
        Pharma Companies
      </Typography>
      <Container styling="">
        <div className="flex flex-col gap-2 md:flex-row justify-between px-6 py-4">
          <div className="w-full md:w-[35%]">
            <SearchInput />
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <div className="w-full">
              <CustomCheckboxSelect
                title="Details"
                options={content.customCheckboxSelectData.pharmaceuticalDetails}
                onApply={handleFilterChange}
                selectedFilters={selectedFilters}
              />
            </div>
            <div className="w-full">
              <CustomCheckboxSelect
                title="Activity"
                options={
                  content.customCheckboxSelectData.pharmaceuticalActivity
                }
                onApply={handleFilterChange}
                selectedFilters={selectedFilters}
              />
            </div>
            <div className="w-full sm:w-[200%]">
              <DateRangeDropdown
                title="Date Range"
                data={content.pharmaceuticalTransactions}
                filterKey="date"
                onFilter={(filteredData) => {
                  setFilteredData(filteredData);
                }}
              />
            </div>
          </div>
        </div>
        <DataTable
          paginate
          meta={meta}
          roundedHeader
          ColumnsData={columns}
          tableRows={paginatedData}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          TableBodyRow={(rowData: any) => (
            <tr
              key={rowData.transactionId}
              className="text-nowrap text-start border-b border-light-gray text-md"
            >
              <td className="py-4 px-6">
                <Typography size="md">{rowData.companyId}</Typography>
              </td>
              <td className="py-4 px-6">
                <Typography size="md">{rowData.pharmaceuticalName}</Typography>
              </td>
              <td className="py-4 px-6">
                <Typography size="md">{rowData.transactionId}</Typography>
              </td>
              <td className="py-4 px-6">
                <Typography size="md">{rowData.details}</Typography>
              </td>
              <td className="py-4 px-6">
                <Typography size="md">{rowData.date}</Typography>
              </td>
              <td className="py-4 px-6">
                <Typography size="md">{rowData.time}</Typography>
              </td>
              <td className="py-4 px-6">
                <div className="flex justify-start">
                  <Typography
                    size="md"
                    className={`text-center w-28 !p-2 font-normal rounded-md ${
                      rowData.status === "Payment"
                        ? "bg-[#D9F6DA] text-[#098B0D]"
                        : rowData.status === "Paid"
                          ? "bg-[#FFDEDE] text-[#C9311A]"
                          : rowData.status === "Withdrawal"
                            ? "bg-[#D9F1F6] text-[#006E84]"
                            : ""
                    }`}
                  >
                    {rowData.status}
                  </Typography>
                </div>
              </td>

              <td className="py-4 px-6">
                <div className="flex justify-start">
                  <Typography
                    size="md"
                    className={`w-[74px] rounded-md !p-2 text-center ${
                      rowData.amount.startsWith("-")
                        ? "bg-[#FFDEDE] text-[#C9311A]"
                        : "bg-[#D9F6DA] text-[#098B0D]"
                    }`}
                  >
                    {rowData.amount}
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

export default PharmaCompaniesTransactionsTab;
