"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import Container from "@/components/shared/container";
import SearchInput from "@/components/shared/search-bar";
import PaginationDataTable from "@/components/data-table/pagination-data-table";
import { customers } from "@/data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Iconify from "@/components/shared/iconify";
import { getUsers } from "@/api/service/auth";

export type CustomerRow = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  lastOrderDate: string;
  orderCount: number;
};

const Customers = () => {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await getUsers();
      if (res?.users) {
        setData(res.users?.map((user: any) => ({ ...user, orders: [] })));
      }
    };
    fetchCustomers();
  }, []);

  const columns = customers.ColumnsData;

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const meta = {
    totalItems: data.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(data.length / rowsPerPage),
  };

  return (
    <Container>
      <div className="p-4">
        <div className="flex xs:flex-row flex-col justify-between items-center w-full gap-4">
          <Typography
            size={"h3"}
            as={"h3"}
            className="text-primary-text font-bold pt-3"
          >
            Customers
          </Typography>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between gap-2 py-4">
          <SearchInput placeholder="Search customer by name or email..." />
        </div>

        <PaginationDataTable
          paginate
          ColumnsData={columns}
          roundedHeader
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          tableRows={paginatedData}
          meta={meta}
          TableBodyRow={({
            _id,
            name,
            email,
            phone,
            orderCount,
            createdAt,
            lastOrderDate,
          }: CustomerRow) => (
            <tr key={_id} className="border-b border-light-gray">
              <td className="py-4 px-4">{name}</td>
              <td className="py-4 px-4">{email}</td>
              <td className="py-4 px-4">{phone}</td>
              <td className="py-4 px-4 text-center">{orderCount}</td>
              <td className="py-4 px-4 text-center">
                {new Date(lastOrderDate).toLocaleDateString() || "--"}
              </td>
              <td className="py-4 px-4 text-center">
                <Link
                  href={`/customer-details?id=${_id}`}
                  className="text-blue-600 underline"
                >
                  <Iconify icon="hugeicons:eye" width="16" height="16" />
                </Link>
              </td>
            </tr>
          )}
        />
      </div>
    </Container>
  );
};

export default Customers;
