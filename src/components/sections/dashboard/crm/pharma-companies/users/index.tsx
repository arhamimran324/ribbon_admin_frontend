import React, { useState } from "react";

import Container from "@/components/shared/container";
import CustomDropdown from "@/components/shared/custom-dropdown";
import DataTable from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import { singlePharmaCompanyUsers } from "@/data";

interface TableBodyRowProps {
  role: string;
  _id: string;
  userName: string;
  email: string;
  joinedDate: string;
  status: string;
  idx: number;
}

const UsersTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalRows = singlePharmaCompanyUsers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const paginatedData = singlePharmaCompanyUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const columns = [
    { id: "userName", label: "User Name" },
    { id: "email", label: "Email Address" },
    { id: "role", label: "Role" },
    { id: "joinedDate", label: "Joined Date", sortable: true },
    { id: "status", label: "Status" },
    { id: "action", label: "Actions" },
  ];
  return (
    <div>
      <Container>
        <div className="p-4">
          <SearchInput />
        </div>
        <DataTable
          paginate
          roundedHeader
          ColumnsData={columns}
          tableRows={paginatedData}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          setRowsPerPage={setRowsPerPage}
          meta={{
            totalItems: totalRows,
            itemsPerPage: rowsPerPage,
            currentPage,
            totalPages,
          }}
          setCurrentPage={setCurrentPage}
          TableBodyRow={({
            userName,
            email,
            joinedDate,
            status,
            role,
            idx,
          }: TableBodyRowProps) => (
            <tr className="font-semibold border-b border-light-gray text-nowrap">
              <td className="text-start px-4 lg:px-6 py-4">
                <Typography size="md" className="font-normal">
                  {userName || "-"}
                </Typography>
              </td>
              <td className="text-start px-4 lg:px-6 py-4">
                <Typography size="md" className="font-normal">
                  {email || "-"}
                </Typography>
              </td>
              <td className="text-start px-4 lg:px-6 py-4">
                <Typography size="md" className="font-normal">
                  {role || "-"}
                </Typography>
              </td>
              <td className="text-start px-4 lg:px-6 py-4">
                <Typography size="md" className="font-normal">
                  {joinedDate || "-"}
                </Typography>
              </td>
              <td className="text-center px-4 lg:px-6 py-4">
                <div className="w-28">
                  <Typography
                    size="md"
                    className={`!m-0 py-2 text-center rounded-lg ${
                      status === "Active"
                        ? "bg-[#D9F6DA] text-[#098B0D]"
                        : "bg-[#FFDEDE] text-[#C9311A]"
                    }`}
                  >
                    {status || "-"}
                  </Typography>
                </div>
              </td>
              <td className="text-center px-4 lg:px-6 py-4">
                <CustomDropdown
                  paginatedData={paginatedData}
                  index={idx}
                  type="user"
                />
              </td>
            </tr>
          )}
        />
      </Container>
    </div>
  );
};

export default UsersTab;
