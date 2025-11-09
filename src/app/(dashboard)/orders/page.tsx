// app/admin/orders/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import Container from "@/components/shared/container";
import SearchInput from "@/components/shared/search-bar";
import PaginationDataTable from "@/components/data-table/pagination-data-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Iconify from "@/components/shared/iconify";
import { getAllOrders } from "@/api/service/dashboard";
import Loading from "@/app/loading";

type OrderRow = {
  id: string;
  orderId: string;
  orderNumber: string;
  customer: string;
  date: string;
  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  items: Array<any>;
  shippingAddress: any;
};

const Orders = () => {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // Fetch orders from backend with pagination
  const fetchOrders = async (page = 1, limit = rowsPerPage, search = "") => {
    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      // Add search filter if search term exists
      if (search.trim()) {
        // You might need to adjust these based on your backend search capabilities
        params.append("search", search);
      }

      const response = await getAllOrders(params.toString());

      if (response.success) {
        const ordersData = response.orders.map((order: any) => ({
          id: order._id,
          orderId: order._id.substring(0, 8).toUpperCase(),
          orderNumber: order.orderNumber,
          customer: order.user
            ? order.user.name || order.user.email
            : typeof order.shippingAddress === "string"
              ? "Guest Customer"
              : order.shippingAddress?.firstName &&
                  order.shippingAddress?.lastName
                ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
                : order.shippingAddress?.email || "Guest Customer",
          date: new Date(order.createdAt).toLocaleDateString(),
          totalAmount: `£${order.total.toFixed(2)}`,
          paymentMethod:
            order.paymentInfo?.paymentMethod === "paypal" ? "PayPal" : "Card",
          paymentStatus: order.paymentInfo?.paymentStatus || "pending",
          orderStatus: order.orderStatus,
          items: order.items,
          shippingAddress: order.shippingAddress,
        }));

        setOrders(ordersData);
        setTotalPages(response.totalPages);
        setTotalOrders(response.total);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when page/rowsPerPage changes
  useEffect(() => {
    fetchOrders(currentPage, rowsPerPage, searchTerm);
  }, [currentPage, rowsPerPage]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      fetchOrders(1, rowsPerPage, searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Columns configuration
  const columns = [
    { id: "orderNumber", label: "Order Number" },
    { id: "customer", label: "Customer" },
    { id: "date", label: "Date" },
    { id: "totalAmount", label: "Total Amount" },
    { id: "paymentStatus", label: "Payment Status" },
    { id: "orderStatus", label: "Order Status" },
    { id: "actions", label: "Actions" },
  ];

  const meta = {
    totalItems: totalOrders,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: totalPages,
  };

  // Payment status badge component
  const PaymentStatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "paid":
          return {
            bgColor: "bg-light-paid",
            textColor: "text-green",
            borderColor: "border-green",
            label: "Paid",
          };
        case "pending":
          return {
            bgColor: "bg-light-pending",
            textColor: "text-blue",
            borderColor: "border-blue",
            label: "Pending",
          };
        case "failed":
          return {
            bgColor: "bg-red-100",
            textColor: "text-red-600",
            borderColor: "border-red-600",
            label: "Failed",
          };
        case "refunded":
          return {
            bgColor: "bg-purple-100",
            textColor: "text-purple-600",
            borderColor: "border-purple-600",
            label: "Refunded",
          };
        default:
          return {
            bgColor: "bg-gray-100",
            textColor: "text-gray-800",
            borderColor: "border-gray-300",
            label: status,
          };
      }
    };

    const config = getStatusConfig(status);

    return (
      <span
        className={`py-2 px-4 rounded-full text-sm flex justify-center font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        {config.label}
      </span>
    );
  };

  // Order status badge component
  const OrderStatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "confirmed":
          return {
            bgColor: "bg-green-100",
            textColor: "text-green-800",
            borderColor: "border-green-800",
            label: "Confirmed",
          };
        case "processing":
          return {
            bgColor: "bg-blue-100",
            textColor: "text-blue-800",
            borderColor: "border-blue-800",
            label: "Processing",
          };
        case "shipped":
          return {
            bgColor: "bg-purple-100",
            textColor: "text-purple-800",
            borderColor: "border-purple-800",
            label: "Shipped",
          };
        case "delivered":
          return {
            bgColor: "bg-teal-100",
            textColor: "text-teal-800",
            borderColor: "border-teal-800",
            label: "Delivered",
          };
        case "cancelled":
          return {
            bgColor: "bg-red-100",
            textColor: "text-red-800",
            borderColor: "border-red-800",
            label: "Cancelled",
          };
        default:
          return {
            bgColor: "bg-gray-100",
            textColor: "text-gray-800",
            borderColor: "border-gray-300",
            label: "Pending",
          };
      }
    };

    const config = getStatusConfig(status);

    return (
      <span
        className={`py-2 px-4 rounded-full text-sm flex justify-center font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        {config.label}
      </span>
    );
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
            Orders ({totalOrders})
          </Typography>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between gap-2 py-4">
          <SearchInput
            placeholder="Search orders by customer name, order number, or status..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {orders.length === 0 && !loading ? (
          <div className="text-center py-8">
            <Typography size={"h4"} className="text-gray-500 mb-4">
              {searchTerm
                ? "No orders found matching your search."
                : "No orders found."}
            </Typography>
            {searchTerm && (
              <Button
                variant="primary"
                onClick={() => {
                  setSearchTerm("");
                  fetchOrders(1, rowsPerPage, "");
                }}
                className="mt-2"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <PaginationDataTable
            paginate={totalOrders > rowsPerPage}
            ColumnsData={columns}
            roundedHeader
            setCurrentPage={handlePageChange}
            setRowsPerPage={handleRowsPerPageChange}
            tableRows={orders}
            meta={meta}
            loading={loading}
            TableBodyRow={({
              id,
              orderNumber,
              customer,
              date,
              totalAmount,
              paymentStatus,
              orderStatus,
            }: OrderRow) => (
              <tr
                key={id}
                className="border-b border-light-gray hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-sm font-medium text-blue-600">
                  {orderNumber}
                </td>
                <td className="py-4 px-4 text-sm">{customer}</td>
                <td className="py-4 px-4 text-sm">{date}</td>
                <td className="py-4 px-4 text-sm font-semibold text-center">
                  {totalAmount}
                </td>

                <td className="py-4 px-4 text-sm">
                  <div className="flex justify-center">
                    <PaymentStatusBadge status={paymentStatus} />
                  </div>
                </td>
                <td className="py-4 px-4 text-sm">
                  <div className="flex justify-center">
                    <OrderStatusBadge status={orderStatus} />
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/orders/view?id=${id}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View Order Details"
                    >
                      <Iconify icon="hugeicons:eye" width="18" height="18" />
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          />
        )}
      </div>
    </Container>
  );
};

export default Orders;
