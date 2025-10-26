"use client";

import { useState } from "react";

import AvailableFunds from "@/components/shared/available-funds";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import DateRangeDropdown from "@/components/shared/date-range-dropdown";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { content, fundsData } from "@/data";

interface TransactionRow {
  _id: string;
  transactionId: string;
  from: string;
  date: string;
  time: string;
  status: string;
  amount: number;
}

const transactionTableColumns = [
  { id: "transactionId", label: "Transaction ID" },
  { id: "from", label: "From" },
  { id: "date", label: "Date", sortable: true },
  { id: "time", label: "Time" },
  { id: "status", label: "Status" },
  { id: "amount", label: "Amount", sortable: true },
];

const TransactionTab = () => {
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionRow[]
  >(content.transactionsTableData);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filterTransactions = (filter: string) => {
    let filtered = content.transactionsTableData;
    if (filter !== "All") {
      filtered = filtered.filter(
        (transaction) => transaction.status === filter,
      );
    }
    setFilteredTransactions(filtered);
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const filterByDateRange = (filteredData: TransactionRow[]) => {
    setFilteredTransactions(filteredData);
    setCurrentPage(1);
  };

  const meta = {
    totalItems: filteredTransactions.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredTransactions.length / rowsPerPage),
  };

  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="w-full flex flex-col justify-between tems-center gap-4">
      {/* Top Section */}
      <Container>
        <AvailableFunds fundsData={fundsData} />
      </Container>

      {/* Search and Filters Section */}
      <Container>
        <div className="w-full flex flex-col custom-1400:flex custom-1400:flex-row justify-between gap-2 p-4">
          <div className="md:flex md:flex-row justify-between custom-1400:justify-center gap-2 flex flex-col">
            <div className="">
              <SearchInput />
            </div>
            <div className="">
              <DateRangeDropdown
                title="Date Range"
                data={content.transactionsTableData}
                filterKey="date"
                onFilter={filterByDateRange}
              />
            </div>
          </div>
          <div className="  md:flex md:flex-row flex flex-col justify-end items-center gap-2">
            {["All", "Paid", "Earnings", "Withdrawal", "Refund", "Pending"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => filterTransactions(filter)}
                  className={`w-full md:w-auto px-[1rem] py-2.5 rounded-lg border ${
                    selectedFilter === filter
                      ? "border-blue text-blue"
                      : "border-light-gray text-gray"
                  }`}
                >
                  <Typography size="md" className="text-center">
                    {filter}
                  </Typography>
                </button>
              ),
            )}
          </div>
        </div>
        <DataTable
          paginate
          roundedHeader={true}
          ColumnsData={transactionTableColumns}
          tableRows={paginatedData}
          rowsPerPage={rowsPerPage}
          meta={meta}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          TableBodyRow={(row: TransactionRow) => (
            <tr
              key={row._id}
              className="text-nowrap text-start border-b border-light-gray text-md"
            >
              <td className="px-4 lg:px-6 py-4">
                <Typography size="md" className="text-dark-charcoal">
                  {row.transactionId}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4">
                <Typography size="md" className="text-dark-charcoal">
                  {row.from}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4">
                <Typography size="md" className="text-dark-charcoal">
                  {row.date}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4">
                <Typography size="md" className="text-dark-charcoal">
                  {row.time}
                </Typography>
              </td>
              <td className="px-4 lg:px-6 py-4">
                <div className="flex justify-start">
                  <Typography
                    size="md"
                    className={`px-4 !py-2 text-center rounded-lg ${
                      row.status === "Earnings"
                        ? "bg-[#D9F6DA] text-[#098B0D]"
                        : row.status === "Pending"
                          ? "bg-light-gray text-gray"
                          : row.status === "Withdrawal"
                            ? "bg-[#D9F1F6] text-blue"
                            : row.status === "Paid"
                              ? "bg-[#FFDEDE] text-[#C9311A]"
                              : "bg-[#E3F0FF] text-[#3363FF]"
                    }`}
                  >
                    {row.status}
                  </Typography>
                </div>
              </td>
              <td className="px-4 lg:px-6 py-4">
                <Typography size="md" className="text-dark-charcoal">
                  {row.amount}
                </Typography>
              </td>
            </tr>
          )}
        />
      </Container>
    </div>
  );
};

export default TransactionTab;
