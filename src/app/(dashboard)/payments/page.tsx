"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@/components/shared/typography";
import Container from "@/components/shared/container";
import SearchInput from "@/components/shared/search-bar";
import PaginationDataTable from "@/components/data-table/pagination-data-table";
import { getAllPayments } from "@/api/service/dashboard";
import Loading from "@/app/loading";

interface Payment {
  _id: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  cardLast4?: string;
  cardBrand?: string;
  receiptUrl?: string;
  createdAt: string;
  order?: {
    _id: string;
    orderNumber: string;
    total: number;
    user?: {
      _id: string;
      name: string;
      email: string;
    };
    itemsCount: number;
  };
}

interface PaymentRow {
  id: string;
  paymentId: string;
  customer: string;
  date: string;
  amount: string;
  method: string;
  status: string;
  orderNumber: string;
}

interface PaymentsResponse {
  success: boolean;
  payments: Payment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  summary: {
    totalAmount: number;
    successfulAmount: number;
    failedAmount: number;
    totalCount: number;
    successfulCount: number;
    failedCount: number;
  };
}

const Payments = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentsData, setPaymentsData] = useState<PaymentsResponse | null>(
    null
  );

  // Columns configuration
  const columns = [
    { id: "paymentId", label: "Payment ID", sortable: true },
    { id: "orderNumber", label: "Order Number", sortable: true },
    { id: "customer", label: "Customer", sortable: true },
    { id: "date", label: "Date", sortable: true },
    { id: "amount", label: "Amount", sortable: true, align: "center" as const },
    { id: "method", label: "Method", sortable: true, align: "center" as const },
    { id: "status", label: "Status", sortable: true, align: "center" as const },
  ];

  // Fetch payments data
  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const filters: any = {
        page: currentPage,
        limit: rowsPerPage,
      };

      if (searchTerm) {
        filters.search = searchTerm;
      }

      if (statusFilter) {
        filters.status = statusFilter;
      }

      if (paymentMethodFilter) {
        filters.paymentMethod = paymentMethodFilter;
      }

      const response = await getAllPayments(filters);

      if (response.success) {
        setPaymentsData(response);
      } else {
        setError("Failed to fetch payments");
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to load payments data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, rowsPerPage, searchTerm, statusFilter, paymentMethodFilter]);

  // Transform API data to table rows
  const transformPaymentData = (payments: Payment[]): PaymentRow[] => {
    return payments.map((payment) => ({
      id: payment._id,
      paymentId: payment.paymentIntentId.slice(0, 8) + "...", // Shorten for display
      customer: payment.order?.user?.name || "N/A",
      date: new Date(payment.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      amount: `£${payment.amount.toFixed(2)}`,
      method:
        payment.paymentMethod === "card"
          ? `Card${payment.cardBrand ? ` (${payment.cardBrand})` : ""}`
          : payment.paymentMethod.charAt(0).toUpperCase() +
            payment.paymentMethod.slice(1),
      status: payment.status.charAt(0).toUpperCase() + payment.status.slice(1),
      orderNumber: payment.order?.orderNumber || "N/A",
    }));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleMethodFilter = (method: string) => {
    setPaymentMethodFilter(method);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchPayments();
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      succeeded: "bg-light-paid text-green border-green",
      processing: "bg-light-pending text-blue border-blue",
      requires_payment_method:
        "bg-yellow-100 text-yellow-800 border-yellow-300",
      requires_confirmation: "bg-orange-100 text-orange-800 border-orange-300",
      requires_action: "bg-purple-100 text-purple-800 border-purple-300",
      canceled: "bg-gray-100 text-gray-800 border-gray-300",
      failed: "bg-red-100 text-red-800 border-red-300",
    };
    return (
      statusColors[status.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border-gray-300"
    );
  };

  if (loading && !paymentsData) {
    return (
      <Container>
        <div className="p-4">
          <Loading />
        </div>
      </Container>
    );
  }

  if (error && !paymentsData) {
    return (
      <Container>
        <div className="p-4">
          <div className="flex justify-center items-center h-64 flex-col gap-4">
            <Typography size="h4" className="text-red-600">
              {error}
            </Typography>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Container>
    );
  }

  const tableData = paymentsData
    ? transformPaymentData(paymentsData.payments)
    : [];
  const meta = paymentsData?.pagination || {
    totalItems: 0,
    itemsPerPage: rowsPerPage,
    currentPage: 1,
    totalPages: 1,
  };

  return (
    <Container>
      <div className="p-4">
        {/* Header */}
        <div className="flex xs:flex-row flex-col justify-between items-center w-full gap-4 mb-6">
          <Typography
            size={"h3"}
            as={"h3"}
            className="text-primary-text font-bold"
          >
            Payments
          </Typography>

          {/* Summary Stats */}
          {paymentsData?.summary && (
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <Typography size="sm" className="text-gray-600">
                  Total
                </Typography>
                <Typography className="font-semibold">
                  £{paymentsData.summary.totalAmount.toFixed(2)}
                </Typography>
              </div>
              <div className="text-center">
                <Typography size="sm" className="text-gray-600">
                  Successful
                </Typography>
                <Typography className="font-semibold text-green">
                  £{paymentsData.summary.successfulAmount.toFixed(2)}
                </Typography>
              </div>
              <div className="text-center">
                <Typography size="sm" className="text-gray-600">
                  Count
                </Typography>
                <Typography className="font-semibold">
                  {paymentsData.summary.totalCount}
                </Typography>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <SearchInput
              placeholder="Search payments by ID, order number, or customer..."
              onChange={(e) => handleSearch(e.target.value)}
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Statuses</option>
              <option value="succeeded">Succeeded</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
              <option value="canceled">Canceled</option>
            </select>

            {/* Payment Method Filter */}
            <select
              value={paymentMethodFilter}
              onChange={(e) => handleMethodFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Methods</option>
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <PaginationDataTable
          paginate={meta.totalItems > rowsPerPage}
          ColumnsData={columns}
          roundedHeader
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          tableRows={tableData}
          meta={meta}
          TableBodyRow={({
            paymentId,
            customer,
            date,
            amount,
            method,
            status,
            orderNumber,
          }: PaymentRow) => (
            <tr
              key={paymentId}
              className="border-b border-light-gray hover:bg-gray-50"
            >
              <td className="py-4 px-4 text-sm font-mono">{paymentId}</td>
              <td className="py-4 px-4 text-sm">{orderNumber}</td>
              <td className="py-4 px-4 text-sm">{customer}</td>
              <td className="py-4 px-4 text-sm">{date}</td>
              <td className="py-4 px-4 text-sm text-center font-semibold">
                {amount}
              </td>
              <td className="py-4 px-4 text-sm text-center">{method}</td>
              <td className="py-4 px-4 text-sm">
                <span
                  className={`py-1 px-3 rounded-full text-xs flex justify-center font-medium border ${getStatusColor(status)}`}
                >
                  {status}
                </span>
              </td>
            </tr>
          )}
        />

        {/* Empty State */}
        {!loading && tableData.length === 0 && (
          <div className="text-center py-8">
            <Typography size="h4" className="text-gray-500">
              No payments found
            </Typography>
            <Typography size="sm" className="text-gray-400 mt-2">
              {searchTerm || statusFilter || paymentMethodFilter
                ? "Try adjusting your filters"
                : "No payments have been processed yet"}
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Payments;
