"use client";

import Image from "next/image";
import React, { useState } from "react";

import PaginationDataTable from "@/components/data-table/pagination-data-table";
import StatsCard from "@/components/sections/dashboard/stats-card";
import Container from "@/components/shared/container";
import DateRangeDropdown from "@/components/shared/date-range-dropdown";
import Iconify from "@/components/shared/iconify";
import InputDropdown from "@/components/shared/input-fields/input-dropdown";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { content, newPrescription } from "@/data";
// import { useGetInvoices } from "@/hooks/api/dashboard/useGetInvoices";

const Invoices = () => {
  const [dropdownitem, setDropdownItem] = useState(
    content?.orderOptions[0].value,
  );
  const [filteredPatientData, setFilteredPatientData] = useState(
    newPrescription?.InvoiceRowsData,
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const { data } = useGetInvoices();
  // console.log("invoices data", data);
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredPatientData(newPrescription?.InvoiceRowsData);
    } else {
      const filteredData = newPrescription?.InvoiceRowsData.filter(
        (row) => row.status === filter,
      );
      setFilteredPatientData(filteredData);
    }
    setCurrentPage(1);
  };
  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const meta = {
    totalItems: filteredPatientData?.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredPatientData.length / rowsPerPage),
  };

  return (
    <div className="flex flex-col pb-1 gap-5">
      <div className=" w-full col-span-1 lg:col-span-2 rounded-xl shadow-md bg-white px-5 pt-5 ">
        <div className="flex xs:flex-row flex-col justify-between items-center w-full gap-4">
          <Typography
            size={"xl"}
            as={"p"}
            className="text-primary-text font-bold w-full xs:w-[58%]"
          >
            Invoices
          </Typography>

          <div className="w-full xs:max-w-[140px] xs:w-[42%]">
            <InputDropdown
              options={content?.orderOptions}
              isSearchable={false}
              value={dropdownitem}
              hideSelectedOptions={false}
              placeholder="Today"
              textColor="!text-[#969696] font-bold !m-0 !h-[2rem]"
              className="border border-light-gray !rounded-[8px] "
              onSelect={(selected) => {
                setDropdownItem(
                  typeof selected === "string" ? selected : selected[0] || "",
                );
              }}
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col w-full justify-between items-center">
          {newPrescription?.newPrescriptionData?.map((item, index) => (
            <React.Fragment key={index}>
              {" "}
              <div className="w-full lg:w-[30%] py-5 flex justify-between items-center">
                <div className="w-full">
                  <StatsCard
                    title={item.title}
                    value={item.value}
                    percentage={item.percentage}
                    icon={item.icon}
                    negative={false}
                    // styling="flex flex-row"
                  />
                </div>
                <div className="w-[30%] flex justify-end">
                  <div className="animated-button p-4  w-[53px] h-[53px] rounded-[10px]">
                    <Image
                      src={item.icon}
                      alt="icon missing"
                      width={23}
                      height={23}
                    />
                  </div>
                </div>
              </div>
              <hr className="last:border-l-0 lg:border-l lg:border-light-gray lg:h-20 border-t-light-gray lg:w-0 w-full last:border-t-0" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <Container>
        <div className="flex flex-row  gap-2 border-b w-full pt-5 px-4">
          {["All", "Pending", "Cancelled"]?.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`w-full sm:w-auto p-4  ${
                activeFilter === filter
                  ? "border-b-2 border-b-primary-color  text-primary-color"
                  : "text-secondary-text-gray border-b-2 border-b-transparent"
              }`}
            >
              <Typography
                size="md"
                as={"p"}
                className="text-center font-semibold"
              >
                {filter}
              </Typography>
            </button>
          ))}
        </div>
        <div className="w-full flex flex-col custom-1400:flex custom-1400:flex-row justify-between gap-2 p-4">
          <div className=" xs:flex xs:flex-row justify-between items-center custom-1400:justify-center gap-5 flex flex-col ">
            <div className="text-secondary-text-gray w-full xs:w-[50%]">
              <SearchInput placeholder="Search patient or prescription number..." />
            </div>
            <div className="w-full xs:w-[50%] xs:flex xs:justify-end">
              <DateRangeDropdown
                position="right-0"
                title="Date Range"
                data={newPrescription?.InvoiceRowsData}
                filterKey="joinDate"
                onFilter={setFilteredPatientData}
              />
            </div>
          </div>
        </div>
        <PaginationDataTable
          paginate
          ColumnsData={newPrescription?.InvoiceColumnsData}
          roundedHeader={true}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          tableRows={paginatedData}
          meta={meta}
          TableBodyRow={({
            orderno,
            date,
            clinic,
            patient,
            status,
          }: {
            orderno: string;
            clinic: string;
            date: string;
            patient: string;
            status: string;
          }) => (
            <tr className="border-b border-light-gray ">
              <td className="text-md text-left text-primary-color  py-5 px-4 lg:px-8 ">
                {orderno || "-"}
              </td>
              <td className="text-md text-left text-primary-color  py-5 px-4 lg:px-8 ">
                {date || "-"}
              </td>
              <td className="text-md text-left text-primary-color  py-5 px-4 lg:px-8 ">
                {clinic || "-"}
              </td>
              <td className="text-md text-left text-primary-color  py-5 px-4 lg:px-8 ">
                {patient || "-"}
              </td>
              <td className="text-md text-left text-primary-color  py-5 px-4 lg:px-8 ">
                <div
                  className={` py-2 text-center rounded-lg text-nowrap  ${
                    status === "Active"
                      ? "bg-primary-light bg-opacity-20 text-primary-color"
                      : status === "Cancelled"
                        ? "bg-red bg-opacity-20 text-red"
                        : status === "Pending"
                          ? "bg-light-gray text-secondary-text-gray"
                          : ""
                  }`}
                >
                  {status || "-"}
                </div>
              </td>
              <td className="text-center ">
                <div className="flex justify-center gap-4 cursor-pointer items-center bg-primary-gradient p-1.5 rounded-sm w-6 h-6">
                  <Iconify
                    className="cursor-pointer"
                    icon="mdi:eye"
                    color="#fff"
                    width="14px"
                    height="14px"
                    // onClick={() => router.push(`/crm/patients/patients-list/single-patient/${_id}`)}
                  />
                </div>
              </td>
            </tr>
          )}
        />
      </Container>
    </div>
  );
};

export default Invoices;
