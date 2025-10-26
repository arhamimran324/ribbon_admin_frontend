"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import Iconify from "@/components/shared/iconify";
import { Button } from "@/components/shared/button";
import { useEffect, useState } from "react";
import { getUserDetailsById } from "@/api/service/auth";
import Loading from "@/app/loading";

interface OrderItem {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  boxType: string;
  noteCard: string;
  personalization: {
    to: string;
    from: string;
    message: string;
    personalized: boolean;
  };
  product: {
    _id: string;
    productName: string;
    category: string;
    price: number;
    image: string;
  };
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: string;
  orderStatus: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingMethod: string;
  paymentInfo: {
    paymentMethod: string;
    paymentStatus: string;
    paymentId: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface OrderStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: string;
  statusDistribution: {
    [key: string]: {
      count: number;
      totalAmount: number;
    };
  };
}

interface CustomerDetails {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  orderStats: OrderStats;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user: CustomerDetails;
  orders: {
    data: Order[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalOrders: number;
      itemsPerPage: number;
    };
  };
}

const CustomerDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [customerData, setCustomerData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getUserDetailsById(id as string);
        if (res) {
          setCustomerData(res);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow">
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      </div>
    );
  }

  if (!customerData || !customerData.user) {
    return (
      <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow">
        <div className="flex justify-center items-center h-64">
          <Typography size="h4" className="text-red-500">
            Customer not found
          </Typography>
        </div>
      </div>
    );
  }

  const { user, orders } = customerData;
  const hasOrders = orders.data.length > 0;

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      confirmed: "bg-blue-100 text-blue-800",
      paid: "bg-green-100 text-green-800",
      delivered: "bg-green-100 text-green-800",
      shipped: "bg-purple-100 text-purple-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      returned: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <div
            className="font-bold text-primary-text cursor-pointer hover:text-primary/80 transition-colors"
            onClick={() => router.push("/customers")}
          >
            <Iconify
              icon="ic:baseline-arrow-back-ios-new"
              width={18}
              className="mr-1"
            />
          </div>
          <Typography size="h3" className="font-bold flex gap-2">
            Customer Details -{" "}
            <span className="text-primary-text">{user.name}</span>
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <hr />

      {/* Customer Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Typography size="h4" className="font-semibold">
            Personal Information
          </Typography>
          <div className="space-y-3">
            <div>
              <Typography size="sm" className="text-gray-600">
                Email
              </Typography>
              <Typography className="font-medium">{user.email}</Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Phone
              </Typography>
              <Typography className="font-medium">{user.phone}</Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Member Since
              </Typography>
              <Typography className="font-medium">
                {formatDate(user.createdAt)}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Customer ID
              </Typography>
              <Typography size="sm" className="font-mono text-gray-700">
                {user._id}
              </Typography>
            </div>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="space-y-4">
          <Typography size="h4" className="font-semibold">
            Order Statistics
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography size="sm" className="text-gray-600">
                Total Orders
              </Typography>
              <Typography size="h4" className="font-bold text-primary-text">
                {user.orderStats.totalOrders}
              </Typography>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography size="sm" className="text-gray-600">
                Total Spent
              </Typography>
              <Typography size="h4" className="font-bold text-primary-text">
                {formatCurrency(user.orderStats.totalSpent)}
              </Typography>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography size="sm" className="text-gray-600">
                Avg. Order Value
              </Typography>
              <Typography size="h4" className="font-bold text-primary-text">
                {formatCurrency(user.orderStats.averageOrderValue)}
              </Typography>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography size="sm" className="text-gray-600">
                Last Order
              </Typography>
              <Typography size="sm" className="font-medium">
                {user.orderStats.lastOrderDate
                  ? formatDate(user.orderStats.lastOrderDate)
                  : "No orders"}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Order History */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Typography size="h4" className="font-semibold">
            Order History
          </Typography>
          <Typography size="sm" className="text-gray-600">
            Total: {orders.pagination.totalOrders} orders
          </Typography>
        </div>

        {hasOrders ? (
          <div className="space-y-4">
            {orders.data.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Typography className="font-semibold">
                      {order.orderNumber}
                    </Typography>
                    <Typography size="sm" className="text-gray-600">
                      {formatDate(order.createdAt)}
                    </Typography>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.paymentInfo.paymentStatus
                      )}`}
                    >
                      {order.paymentInfo.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentInfo.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <Typography size="sm" className="font-medium mb-2">
                    Items ({order.items.length}):
                  </Typography>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <Typography size="sm" className="font-medium">
                            {item.productName}
                          </Typography>
                          <Typography size="sm" className="text-gray-600">
                            Qty: {item.quantity} × {formatCurrency(item.price)}
                          </Typography>
                          {item.personalization.personalized && (
                            <Typography size="xs" className="text-blue-600">
                              Personalized: {item.personalization.from} →{" "}
                              {item.personalization.to}
                            </Typography>
                          )}
                        </div>
                        <Typography size="sm" className="font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <Typography size="sm" className="text-gray-600">
                      Shipping: {order.shippingMethod}
                    </Typography>
                    <Typography size="sm" className="text-gray-600">
                      Payment: {order.paymentInfo.paymentMethod}
                    </Typography>
                  </div>
                  <Typography size="lg" className="font-bold">
                    {formatCurrency(order.total)}
                  </Typography>
                </div>

                {/* Shipping Address */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Typography size="sm" className="text-gray-600">
                    Shipping Address:
                  </Typography>
                  <Typography size="sm" className="font-medium">
                    {order.shippingAddress}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Iconify
              icon="mingcute:empty-box-fill"
              width="80"
              height="80"
              className="text-gray-300 mb-4"
            />
            <Typography size="lg" className="text-gray-500 mb-2">
              No orders placed yet
            </Typography>
            <Typography size="sm" className="text-gray-400">
              This customer hasn't placed any orders
            </Typography>
          </div>
        )}
      </div>

      {/* Status Distribution */}
      {hasOrders && (
        <>
          <hr />
          <div className="space-y-4">
            <Typography size="h4" className="font-semibold">
              Order Status Distribution
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(user.orderStats.statusDistribution).map(
                ([status, data]) => (
                  <div key={status} className="bg-gray-50 p-4 rounded-lg">
                    <Typography size="sm" className="text-gray-600 capitalize">
                      {status}
                    </Typography>
                    <Typography
                      size="h4"
                      className="font-bold text-primary-text"
                    >
                      {data.count}
                    </Typography>
                    <Typography size="sm" className="text-gray-600">
                      {formatCurrency(data.totalAmount)}
                    </Typography>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
