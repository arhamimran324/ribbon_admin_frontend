import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { FC, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

import { useAppSelector } from "@/redux/hooks";
import { applySortFilter } from "@/utils/search-filter";
import Iconify from "../iconify";
import { Typography } from "../typography";

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  notFonudText?: string;
  paginate?: boolean;
  loading?: boolean;
  tableRows: any[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  ColumnsData: Column[];
  TableBodyRow: any;
  topListedCountries?: boolean;
  roundedHeader?: boolean;
  headerClassName?: string;
  headerPosition?: string;
  invoice?: boolean;
  meta?: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  setCurrentPage?: (page: number) => void;
  setRowsPerPage?: (rows: number) => void;
}

const DataTable: FC<DataTableProps> = ({
  invoice,
  notFonudText,
  paginate = false,
  loading = false,
  tableRows = [],
  rowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 20],
  ColumnsData = [],
  TableBodyRow,
  roundedHeader = false,
  headerClassName = "",
  headerPosition,
  meta = { totalItems: 0, itemsPerPage: 5, currentPage: 1, totalPages: 1 },
  setCurrentPage,
  setRowsPerPage,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const appState = useAppSelector((state) => state.app);

  const filteredRows = useMemo(
    () => applySortFilter(tableRows, appState.filterName),
    [tableRows, appState.filterName],
  );

  const isTableEmpty = useMemo(
    () => tableRows.length === 0 && !loading,
    [tableRows, loading],
  );

  const isFilterNotFound = useMemo(
    () => !isTableEmpty && filteredRows.length === 0 && !!appState.filterName,
    [appState.filterName, filteredRows.length, isTableEmpty],
  );

  const handleSort = (columnId: string, isSortable: boolean) => {
    if (!isSortable) return;

    setSortConfig((prev) => {
      if (prev?.key === columnId) {
        return {
          key: columnId,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: columnId, direction: "asc" };
    });
  };

  const sortedRows = React.useMemo(() => {
    if (!sortConfig) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig]);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handlePageChange = (newPage: { selected: number }) => {
    if (setCurrentPage) {
      setCurrentPage(newPage.selected + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col overflow-auto data-table-scrollable">
        <table className="min-w-full">
          <thead
            className={`${roundedHeader ? "rounded-lg" : ""} ${headerPosition} bg-primary-gradient text-white`}
          >
            <tr>
              {ColumnsData.map((column, index) => (
                <th
                  key={index}
                  onClick={() =>
                    column.sortable &&
                    handleSort(column.id, column.sortable ?? false)
                  }
                  className={`px-4 lg:px-6 py-4 font-bold whitespace-nowrap tracking-wider ${
                    column?.id === "action" ? "opacity-0" : ""
                  } text-md ${roundedHeader && index === 0 ? "rounded-l-lg" : ""} ${
                    roundedHeader && index === ColumnsData.length - 1
                      ? "rounded-r-lg"
                      : ""
                  } ${headerClassName} ${column.sortable ? "cursor-pointer select-none" : ""} ${
                    invoice
                      ? index === 0
                        ? "text-start"
                        : "text-center"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`flex items-center ${invoice ? (index === 0 ? "justify-start" : "justify-center") : ""}`}
                  >
                    {column.label}
                    {column.sortable && (
                      <div className="flex flex-col justify-center gap-0 items-center">
                        <Iconify
                          icon="raphael:arrowup"
                          height="10"
                          width="20"
                        />
                        <Iconify
                          icon="raphael:arrowdown"
                          height="10"
                          width="20"
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!loading &&
              sortedRows.map((row, idx) => (
                <TableBodyRow key={row._id || row.id} {...row} idx={idx} />
              ))}
            {loading &&
              [...Array(rowsPerPage)].map((_, idx) => (
                <tr key={idx}>
                  {[...Array(ColumnsData.length)].map((_, index) => (
                    <td
                      key={index}
                      className="px-4 py-7 text-primary-text text-md"
                    >
                      <div className="w-full h-4 bg-light-gray rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>

          {(isFilterNotFound || isTableEmpty) && (
            <tbody className="h-full">
              <tr className="h-full">
                <td
                  colSpan={ColumnsData.length}
                  className="h-[200px] align-middle"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Image
                      src="/assets/svg/no-data.svg"
                      alt="no-data"
                      width={124}
                      height={124}
                    />
                    <Typography size="lg" className="font-bold text-light-gray">
                      {notFonudText ? notFonudText : "No data found"}
                    </Typography>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {/* Pagination */}
      {paginate && !loading && tableRows.length > 0 && (
        <div className="w-full relative flex flex-col md:flex md:flex-row justify-end gap-4 md:gap-6 items-end md:items-center p-6">
          <div className="flex relative items-center gap-2">
            <Typography size="sm" className="text-gray">
              Rows per page:
            </Typography>
            <div className="relative z-20 bg-light-gray rounded-3xl px-3 py-2 text-sm text-center cursor-pointer">
              <div
                className="flex gap-0.1 items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div>{meta.itemsPerPage}</div>
                <Icon
                  icon="mdi:chevron-down"
                  className="text-gray"
                  width={16}
                  height={16}
                />
              </div>
              {dropdownOpen && (
                <div
                  className="absolute bottom-full left-0 w-full bg-white shadow-md rounded-lg mb-1 z-50 overflow-y-auto"
                  style={{ maxHeight: "150px" }}
                >
                  {rowsPerPageOptions.map((option) => (
                    <div
                      key={option}
                      className={`px-3 py-2 text-sm text-center cursor-pointer hover:bg-light-gray ${
                        meta.itemsPerPage === option ? "bg-light-gray" : ""
                      }`}
                      onClick={() => {
                        if (setRowsPerPage) setRowsPerPage(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <Typography size="sm" className="text-primary-text">
              Result {(meta.currentPage - 1) * meta.itemsPerPage + 1} -{" "}
              {Math.min(meta.currentPage * meta.itemsPerPage, meta.totalItems)}{" "}
              of {meta.totalItems}
            </Typography>
          </div>
          <div className="flex justify-center items-center">
            {/* Pagination */}
            <ReactPaginate
              pageCount={meta.totalPages}
              breakLabel="..."
              onPageChange={handlePageChange}
              forcePage={meta.currentPage - 1}
              pageRangeDisplayed={12}
              marginPagesDisplayed={1}
              previousLabel={
                <span className="text-gray">
                  <Icon
                    icon="grommet-icons:form-previous"
                    width="18"
                    height="18"
                  />
                </span>
              }
              nextLabel={
                <span className=" text-gray">
                  <Icon icon="grommet-icons:form-next" width="18" height="18" />
                </span>
              }
              containerClassName="flex justify-center items-center gap-2"
              pageClassName="w-8 h-8 flex justify-center items-center text-gray rounded-full cursor-pointer"
              activeClassName=" border border-light-blue text-light-green"
              breakClassName="w-8 h-8 flex justify-center items-center"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
