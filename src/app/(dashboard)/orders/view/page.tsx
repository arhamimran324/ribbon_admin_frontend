"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import Iconify from "@/components/shared/iconify";
import { useEffect, useState } from "react";
import { getOrderById } from "@/api/service/dashboard";
import Loading from "@/app/loading";

interface OrderItem {
  personalization: {
    to: string;
    from: string;
    message: string;
    personalized: boolean;
  };
  product: {
    _id: string;
    productName: string;
    description: string;
    price: number;
    discount: number;
    status: string;
    category: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  productName: string;
  price: number;
  quantity: number;
  boxType: string;
  noteCard: string;
  _id: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  shippingAddress: string;
  orderStatus: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingMethod: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  paymentInfo: {
    paymentMethod: string;
    paymentStatus: string;
    paymentId: string;
  };
}

const OrderDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getOrderById(id as string);
        setOrder(res.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      confirmed: "bg-blue-100 text-blue-800",
      paid: "bg-green-100 text-green-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if an item has personalization data
  const hasPersonalization = (item: OrderItem) => {
    return (
      item.personalization &&
      (item.personalization.personalized ||
        item.personalization.to ||
        item.personalization.from ||
        item.personalization.message)
    );
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow">
        <Loading />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow">
        <div className="flex items-center justify-center h-64">
          <Typography size="h4" className="text-red-600">
            Order not found
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <div
            className="font-bold text-primary-text cursor-pointer hover:text-primary/80 transition-colors"
            onClick={() => router.push("/orders")}
          >
            <Iconify
              icon="ic:baseline-arrow-back-ios-new"
              width={18}
              className="mr-1"
            />
          </div>
          <Typography size="h3" className="font-bold flex gap-2">
            Order Details -{" "}
            <span className="text-primary-text">{order.orderNumber}</span>
          </Typography>
        </div>
        <div className="flex items-center gap-4">
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

      <hr />

      {/* Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <Typography size="h4" className="font-semibold mb-4">
            Customer Information
          </Typography>
          <div className="space-y-3">
            <div>
              <Typography size="sm" className="text-gray-600">
                Name
              </Typography>
              <Typography className="font-medium">
                {order?.user?.name || "Guest"}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Email
              </Typography>
              <Typography className="font-medium">
                {order?.user?.email || "-"}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Phone
              </Typography>
              <Typography className="font-medium">
                {order?.user?.phone || "-"}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Customer ID
              </Typography>
              <Typography size="sm" className="font-mono text-gray-700">
                {order?.user?._id || "-"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <Typography size="h4" className="font-semibold mb-4">
            Shipping Information
          </Typography>
          <div className="space-y-3">
            <div>
              <Typography size="sm" className="text-gray-600">
                Address
              </Typography>
              <Typography className="font-medium">
                {order.shippingAddress}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Method
              </Typography>
              <Typography className="font-medium capitalize">
                {order.shippingMethod}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Order Date
              </Typography>
              <Typography className="font-medium">
                {formatDate(order.createdAt)}
              </Typography>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <Typography size="h4" className="font-semibold mb-4">
            Payment Information
          </Typography>
          <div className="space-y-3">
            <div>
              <Typography size="sm" className="text-gray-600">
                Method
              </Typography>
              <Typography className="font-medium capitalize">
                {order.paymentInfo.paymentMethod}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Status
              </Typography>
              <Typography className="font-medium capitalize">
                {order.paymentInfo.paymentStatus}
              </Typography>
            </div>
            <div>
              <Typography size="sm" className="text-gray-600">
                Payment ID
              </Typography>
              <Typography size="sm" className="font-mono text-gray-700">
                {order.paymentInfo.paymentId}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <Typography size="h4" className="font-semibold mb-4">
          Order Items ({order.items.length})
        </Typography>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <Iconify
                      icon="mdi:package-variant"
                      width={24}
                      className="text-gray-400"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="">
                      <Typography className="font-semibold">
                        {item.productName}
                      </Typography>
                      <Typography size="sm" className="text-gray-600">
                        {item.product.category}
                      </Typography>
                      <div className="flex gap-4 mt-1">
                        <Typography size="sm" className="text-gray-600">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography size="sm" className="text-gray-600">
                          Box: {item.boxType}
                        </Typography>
                        {item.noteCard !== "None" && (
                          <Typography size="sm" className="text-gray-600">
                            Note: {item.noteCard}
                          </Typography>
                        )}
                      </div>
                    </div>
                    <Typography className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </div>

                  {/* Enhanced Personalization Display */}
                  {hasPersonalization(item) && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Typography
                        size="sm"
                        className="font-semibold text-blue-800 mb-2"
                      >
                        🎁 Personalization Details
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {item.personalization.from && (
                          <div>
                            <Typography
                              size="xs"
                              className="text-blue-600 font-medium"
                            >
                              From:
                            </Typography>
                            <Typography size="sm" className="text-blue-700">
                              {item.personalization.from}
                            </Typography>
                          </div>
                        )}
                        {item.personalization.to && (
                          <div>
                            <Typography
                              size="xs"
                              className="text-blue-600 font-medium"
                            >
                              To:
                            </Typography>
                            <Typography size="sm" className="text-blue-700">
                              {item.personalization.to}
                            </Typography>
                          </div>
                        )}
                        {item.personalization.message && (
                          <div className="md:col-span-2">
                            <Typography
                              size="xs"
                              className="text-blue-600 font-medium"
                            >
                              Message:
                            </Typography>
                            <Typography
                              size="sm"
                              className="text-blue-700 italic"
                            >
                              "{item.personalization.message}"
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <Typography size="h4" className="font-semibold mb-4">
          Order Summary
        </Typography>
        <div className="max-w-xs ml-auto space-y-3">
          <div className="flex justify-between">
            <Typography className="text-gray-600">Subtotal</Typography>
            <Typography>${order.subtotal.toFixed(2)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="text-gray-600">Tax</Typography>
            <Typography>${order.tax.toFixed(2)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="text-gray-600">Shipping Fee</Typography>
            <Typography>${order.shippingFee.toFixed(2)}</Typography>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between">
              <Typography className="text-gray-600">Discount</Typography>
              <Typography className="text-green-600">
                -${order.discount.toFixed(2)}
              </Typography>
            </div>
          )}
          <hr />
          <div className="flex justify-between">
            <Typography className="font-semibold">Total</Typography>
            <Typography className="font-bold text-lg">
              ${order.total.toFixed(2)}
            </Typography>
          </div>
        </div>
      </div>

      {/* Order Metadata */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <Typography size="h4" className="font-semibold mb-4">
          Order Metadata
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <Typography size="sm" className="text-gray-600">
              Order ID
            </Typography>
            <Typography size="sm" className="font-mono">
              {order._id}
            </Typography>
          </div>
          <div>
            <Typography size="sm" className="text-gray-600">
              Created At
            </Typography>
            <Typography size="sm">{formatDate(order.createdAt)}</Typography>
          </div>
          <div>
            <Typography size="sm" className="text-gray-600">
              Last Updated
            </Typography>
            <Typography size="sm">{formatDate(order.updatedAt)}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
