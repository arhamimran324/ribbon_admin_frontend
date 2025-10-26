"use client";

import React, { useState } from "react";

import Container from "@/components/shared/container";
import CustomCheckboxSelect from "@/components/shared/custom-checkbox-select";
import CustomDropdown from "@/components/shared/custom-dropdown";
import DataTable from "@/components/shared/data-table";
import DateRangeDropdown from "@/components/shared/date-range-dropdown";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { content } from "@/data";

interface AppointmentRow {
  _id: string;
  clinicName: string;
  specialty: string;
  date: string;
  time: string;
  payments: string;
  type: string;
  status: string;
  idx: number;
}
const appointmentTableColumns = [
  { id: "clinicName", label: "Clinic Name" },
  { id: "specialty", label: "Specialty" },
  { id: "date", label: "Date", sortable: true },
  { id: "time", label: "Time" },
  { id: "type", label: "Type" },
  { id: "status", label: "Status" },
  { id: "payments", label: "Payments", sortable: true },
  { id: "status", label: "" },
];

const AppointmentTab = () => {
  const [filteredAppointments, setFilteredAppointments] = useState(
    content?.appointmentTableData,
  );
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<string>("All");

  const meta = {
    totalItems: filteredAppointments.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredAppointments.length / rowsPerPage),
  };

  const paginatedData = filteredAppointments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const filterAppointments = (status: string) => {
    setSelectedStatusFilter(status);

    if (status === "All") {
      setFilteredAppointments(content?.appointmentTableData);
    } else {
      const filtered = content?.appointmentTableData.filter(
        (appointment) => appointment.status === status,
      );
      setFilteredAppointments(filtered);
    }

    setCurrentPage(1);
  };

  return (
    <Container>
      <div className="w-full flex flex-col custom-1400:flex custom-1400:flex-row justify-between gap-2 p-4">
        <div className=" md:flex md:flex-row justify-between custom-1400:justify-center gap-2 flex flex-col">
          <div className="">
            <SearchInput />
          </div>
          <div className="">
            <DateRangeDropdown
              position="right-0"
              title="Date Range"
              data={content.appointmentTableData}
              filterKey="date"
              onFilter={setFilteredAppointments}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex md:flex-row justify-end gap-2">
          <CustomCheckboxSelect
            title="Type"
            options={content.customCheckboxSelectData.type}
            onApply={setSelectedFilters}
            selectedFilters={selectedFilters}
          />
          <div className=" md:flex md:flex-row flex flex-col justify-end items-center gap-2">
            {["All", "Upcoming", "Attended", "Cancelled"].map((filter) => (
              <button
                key={filter}
                onClick={() => filterAppointments(filter)}
                className={`w-full md:w-auto px-[1rem] py-2.5 rounded-lg border ${
                  selectedStatusFilter === filter
                    ? "border-blue text-blue"
                    : "border-light-gray text-gray"
                }`}
              >
                <Typography size="md" className="text-center">
                  {filter}
                </Typography>
              </button>
            ))}
          </div>
        </div>
      </div>
      <DataTable
        paginate
        roundedHeader={true}
        ColumnsData={appointmentTableColumns}
        tableRows={paginatedData}
        rowsPerPage={rowsPerPage}
        meta={meta}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        TableBodyRow={({
          _id,
          clinicName,
          specialty,
          date,
          time,
          type,
          status,
          payments,
          idx,
        }: AppointmentRow) => (
          <tr
            key={_id}
            className="text-nowrap text-start border-b border-light-gray text-md"
          >
            <td className="px-4 lg:px-6 py-4">
              <Typography size="md" className="text-dark-charcoal">
                {clinicName}
                {idx}
              </Typography>
            </td>
            <td className="px-4 lg:px-6 py-4">
              <Typography size="md" className="text-dark-charcoal">
                {specialty}
              </Typography>
            </td>
            <td className="px-4 lg:px-6 py-4">
              <Typography size="md" className="text-dark-charcoal">
                {date}
              </Typography>
            </td>
            <td className="px-4 lg:px-6 py-4">
              <Typography size="md" className="text-dark-charcoal">
                {time}
              </Typography>
            </td>
            <td className="px-4 lg:px-6 py-4">
              <Typography
                size="md"
                className={`px-4 py-2 text-center rounded-lg ${
                  type === "Remote"
                    ? "bg-[#D9F6DA] text-[#098B0D]"
                    : "bg-[#D9F1F6] text-[#006E84]"
                }`}
              >
                {type}
              </Typography>
            </td>
            <td className="px-4 lg:px-6 py-4">
              <Typography
                size="md"
                className={`px-4 py-2 text-center rounded-lg ${
                  status === "Upcoming"
                    ? "bg-[#D9F6DA] text-[#098B0D]"
                    : status === "Cancelled"
                      ? "bg-[#FFDEDE] text-[#C9311A]"
                      : "bg-[#D9F1F6] text-blue"
                }`}
              >
                {status}
              </Typography>
            </td>
            <td className="px-4 lg:px-6 py-4">
              <Typography
                size="md"
                className="bg-[#D9F6DA] text-[#098B0D] px-4 py-2 text-center rounded-lg"
              >
                {payments}
              </Typography>
            </td>
            <td className="flex justify-center px-4 lg:px-6  py-4">
              <CustomDropdown
                paginatedData={paginatedData}
                invoices={true}
                type="Invoice"
                index={idx}
              />
            </td>
          </tr>
        )}
      />
    </Container>
  );
};
export default AppointmentTab;
