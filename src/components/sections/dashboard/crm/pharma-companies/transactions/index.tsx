"use clientx";

import React, { useState } from "react";

import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import DateRangeDropdown from "@/components/shared/date-range-dropdown";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { singlePharmaCompanyTransaction } from "@/data";

interface TableRows {
  _id: string;
  transactionNo: string;
  details: string;
  quantity: string;
  time: string;
  date: string;
  amount: string;
  status: string;
}

const columns = [
  {
    id: "transactionNo",
    label: "Transaction No",
  },
  {
    id: "details",
    label: "Details",
  },
  {
    id: "quantity",
    label: "Quantity",
    sortable: true,
    selector: (row: any) => row.date,
  },
  {
    id: "date",
    label: "Date",
    sortable: true,
    selector: (row: any) => row.time,
  },
  {
    id: "time",
    label: "Time",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "amount",
    label: "Amount",
    sortable: true,
    selector: (row: any) => row.status,
  },
];

const TransactionTab = () => {
  const [filteredData, setFilteredData] = useState(
    singlePharmaCompanyTransaction,
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const filterAppointments = (filter: string) => {
    if (filter === "All") {
      setFilteredData(singlePharmaCompanyTransaction);
    } else {
      const filtered = singlePharmaCompanyTransaction.filter(
        (row) => row.status === filter,
      );
      setFilteredData(filtered);
    }
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  return (
    <Container>
      <div className="flex flex-col lg:flex-row justify-center gap-2 p-4">
        <div className="w-full flex flex-col md:flex md:flex-row gap-2">
          <div className="">
            <SearchInput />
          </div>
          <div className="">
            <DateRangeDropdown
              title="Date Range"
              data={singlePharmaCompanyTransaction}
              filterKey="date"
              onFilter={setFilteredData}
            />
          </div>
        </div>
        <div className="w-full xl:w-fit md:md:flex md:flex-row flex flex-col justify-end items-center gap-2">
          {["All", "Purchased", "Pending", "Withdrawal"].map((filter) => (
            <button
              key={filter}
              onClick={() => filterAppointments(filter)}
              className={`w-full md:w-auto px-5 py-3 rounded-lg border text-md ${
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
        roundedHeader
        ColumnsData={columns}
        tableRows={paginatedData}
        rowsPerPage={rowsPerPage}
        meta={{
          totalItems,
          itemsPerPage: rowsPerPage,
          currentPage,
          totalPages,
        }}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        TableBodyRow={({
          _id,
          transactionNo,
          details,
          quantity,
          time,
          date,
          amount,
          status,
        }: TableRows) => {
          return (
            <tr key={_id} className="text-nowrap border-b border-light-gray">
              <td className="px-4 lg:px-4 py-4">
                <Typography
                  size="md"
                  className="text-dark-charcoal text-start px-2"
                >
                  {transactionNo || "-"}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4 text-start">
                <Typography size="md" className="text-dark-charcoal">
                  {details || "-"}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4 text-start">
                <Typography size="md" className="text-dark-charcoal">
                  {quantity || "-"}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4 text-start">
                <Typography size="md" className="text-dark-charcoal">
                  {date || "-"}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4 text-start">
                <Typography size="md" className="text-dark-charcoal">
                  {time || "-"}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4 text-start">
                <Typography
                  size="md"
                  className={`px-4 py-2 text-center rounded-lg ${
                    status === "Payment"
                      ? "bg-[#D9F6DA] text-[#098B0D]"
                      : status === "Purchased"
                        ? "bg-[#FFDEDE] text-[#C9311A]"
                        : "bg-[#D9F1F6] text-blue"
                  }`}
                >
                  {status || "-"}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4 text-center">
                <Typography
                  size="md"
                  className={`px-1 py-2 text-center rounded-lg ${
                    status === "Payment"
                      ? "bg-[#D9F6DA] text-[#098B0D]"
                      : status === "Purchased"
                        ? "bg-[#FFDEDE] text-[#C9311A]"
                        : "bg-[#D9F1F6] text-blue"
                  }`}
                >
                  {amount || "-"}
                </Typography>
              </td>
            </tr>
          );
        }}
      />
    </Container>
  );
};

export default TransactionTab;
