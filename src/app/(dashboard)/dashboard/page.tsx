"use client";

import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import DataTable from "@/components/data-table";
import StatsCard from "@/components/sections/dashboard/stats-card";
import AreaChart from "@/components/shared/charts/area-chart";
import InputDropdown from "@/components/shared/input-fields/input-dropdown";
import WelcomeCard from "@/components/shared/welcome-card";
import { Typography } from "@/components/ui/typography";
import { content, dashboard } from "@/data";
import CountdownTimer from "@/components/shared/countDownTimer";
import { getUsers } from "@/api/service/auth";
import { getAllPayments } from "@/api/service/dashboard";

interface Payment {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  order: {
    _id: string;
    orderNumber: string;
    total: number;
    user: {
      _id: string;
      name: string;
      email: string;
    } | null;
    itemsCount: number;
  };
}

interface PaymentSummary {
  totalAmount: number;
  successfulAmount: number;
  failedAmount: number;
  totalCount: number;
  successfulCount: number;
  failedCount: number;
}

interface ChartData {
  series: { name: string; data: number[] }[];
  categories: string[];
}

const Home: NextPage = () => {
  const [dropdownitem, setDropdownItem] = useState(
    content.orderOptions[0].value
  );
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null
  );
  const [last5DaysChartData, setLast5DaysChartData] = useState<ChartData>({
    series: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);

  const getLast5Days = () => {
    const dates = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const processLast5DaysData = (payments: Payment[]) => {
    const last5Days = getLast5Days();

    const dailyTotals = last5Days.map((date) => ({
      date,
      total: 0,
      successful: 0,
    }));

    payments.forEach((payment) => {
      const paymentDate = new Date(payment.createdAt)
        .toISOString()
        .split("T")[0];
      const dayIndex = last5Days.indexOf(paymentDate);

      if (dayIndex !== -1) {
        dailyTotals[dayIndex].total += payment.amount;
        if (payment.status === "succeeded") {
          dailyTotals[dayIndex].successful += payment.amount;
        }
      }
    });

    const categories = last5Days.map((date) => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    });

    const series = [
      {
        name: "Successful Payments",
        data: dailyTotals.map((day) => day.successful),
      },
      {
        name: "Total Payments",
        data: dailyTotals.map((day) => day.total),
      },
    ];

    return { series, categories };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 4);

        const formatDate = (date: Date) => date.toISOString().split("T")[0];

        const [usersRes, paymentsRes] = await Promise.all([
          getUsers(),
          getAllPayments({
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          }),
        ]);

        if (usersRes?.users) {
          setUsers(
            usersRes.users?.map((user: any) => ({ ...user, orders: [] }))
          );
        }

        if (paymentsRes?.success) {
          setPayments(paymentsRes.payments || []);
          setPaymentSummary(paymentsRes.summary || null);

          const chartData = processLast5DaysData(paymentsRes.payments || []);
          setLast5DaysChartData(chartData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateAllTimeStats = () => {
    if (!payments.length) return null;

    const successfulPayments = payments.filter(
      (payment) => payment.status === "succeeded"
    );
    const totalRevenue = successfulPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const averageOrderValue =
      successfulPayments.length > 0
        ? totalRevenue / successfulPayments.length
        : 0;

    const successRate =
      payments.length > 0
        ? (successfulPayments.length / payments.length) * 100
        : 0;

    return {
      totalRevenue,
      successfulTransactions: successfulPayments.length,
      averageOrderValue,
      successRate,
    };
  };

  const allTimeStats = calculateAllTimeStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-5 pb-5 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <Typography
          size={"h3"}
          as={"h3"}
          className="text-primary-text font-bold pt-3"
        >
          Dashboard
        </Typography>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-5">
        <div className="w-full col-span-1 lg:col-span-4">
          <WelcomeCard />
        </div>
        <div className="w-full col-span-1 lg:col-span-2 flex flex-col justify-between rounded-xl shadow-lg bg-white text-center">
          <div className="pt-5 px-6">
            <StatsCard
              title={"Last 5 Days Revenue"}
              value={formatCurrency(paymentSummary?.successfulAmount || 0)}
              percentage={
                allTimeStats
                  ? `${allTimeStats.successRate.toFixed(1)}% Success`
                  : "0%"
              }
              negative={false}
            />
          </div>
          <div className="pt-2 pl-3 area-chart">
            <AreaChart
              showDollarSign
              seriesData={last5DaysChartData.series}
              categoriesData={last5DaysChartData.categories}
            />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-5">
        <div className="w-full col-span-1 lg:col-span-4">
          <div className="rounded-2xl bg-white shadow-md py-4 px-6 md:px-12 text-black h-full">
            <DataTable
              isUserList={true}
              ColumnsData={dashboard?.ColumnsData}
              tableRows={users.slice(0, 5)}
              TableBodyRow={({
                name,
                email,
                orderCount,
              }: {
                name: string;
                email: string;
                orderCount: string;
              }) => (
                <tr className="border-b border-light-gray last:border-b-0">
                  <td className="text-md text-left py-5 ">{name || "-"}</td>
                  <td className="text-md text-left py-5 ">{email || "-"}</td>
                  <td className="text-md text-right py-5 ">
                    {orderCount || 0}
                  </td>
                </tr>
              )}
            />
          </div>
        </div>
        <div className="w-full col-span-1 lg:col-span-2 rounded-xl shadow-md bg-white px-5 pt-5">
          <div className="flex xs:flex-row flex-col gap-2 justify-between items-center w-full">
            <Typography
              size={"h4"}
              as={"h4"}
              className="text-primary-text font-bold w-full xs:w-[58%]"
            >
              Payments
            </Typography>
          </div>

          {/* All-Time Payment Overview Cards */}
          <div className="space-y-4 my-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">All-Time Revenue</p>
                  <p className="text-lg font-bold text-green-700">
                    {formatCurrency(paymentSummary?.successfulAmount || 0)}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {paymentSummary?.successfulCount || 0} successful payments
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">💰</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Payment Success Rate</p>
                  <p className="text-lg font-bold text-blue-700">
                    {allTimeStats
                      ? `${allTimeStats.successRate.toFixed(1)}%`
                      : "0%"}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {paymentSummary?.successfulCount || 0} of{" "}
                    {paymentSummary?.totalCount || 0} payments
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">✓</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Average Order Value</p>
                  <p className="text-lg font-bold text-purple-700">
                    {allTimeStats
                      ? formatCurrency(allTimeStats.averageOrderValue)
                      : "$0.00"}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Across all successful orders
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-bold">Ø</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Processed</p>
                  <p className="text-lg font-bold text-orange-700">
                    {formatCurrency(paymentSummary?.totalAmount || 0)}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    Including failed attempts
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-bold">💳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
