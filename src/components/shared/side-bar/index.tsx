"use client";

import Image from "next/image";
import React, { useState } from "react";

import { Typography } from "@/components/ui/typography";
import circleIcon from "@/public/assets/svg/circle-icon.svg";
import dashboardIcon from "@/public/assets/svg/dashboard-icon.svg";
import downAngleIcon from "@/public/assets/svg/down-angle-icon.svg";
import logoutIcon from "@/public/assets/svg/logout-icon.svg";
import ordersIcon from "@/public/assets/svg/order-icon.svg";
import paymentsIcon from "@/public/assets/svg/payment-icon.svg";
import prescriptionIcon from "@/public/assets/svg/prescription-icon.svg";
import greenRightAngleIcon from "@/public/assets/svg/right-angle-icon-green.svg";
import rightAngleIcon from "@/public/assets/svg/right-angle-icon.svg";
import sideBarLogo from "@/public/assets/svg/sidebar-logo.svg";
import transactionsIcon from "@/public/assets/svg/transaction-icon.svg";
import usersIcon from "@/public/assets/svg/user-management-icon.svg";

// import { SideBarProps } from '@/types';

const SideBar: React.FC<any> = () => {
  const [selectitem, setSelectItem] = useState("dashboard");
  const [prescriptionItem, setPrescriptionItem] = useState(false);

  const pathHandler = (pathname: string) => {
    if (pathname === "prescription") {
      setPrescriptionItem(!prescriptionItem);
      setSelectItem("prescription");
    } else if (["new-user", "invoices"].includes(pathname)) {
      setPrescriptionItem(true);
      setSelectItem(pathname);
    } else {
      setPrescriptionItem(false);
      setSelectItem(pathname);
    }
  };

  const isActive = (item: string) => {
    if (item === "new-user" || item === "invoices") {
      return selectitem === item && "bg-white bg-opacity-20 rounded-[10px]";
    }
    if (selectitem === item) {
      return "sidebar-active";
    }
    if (item === "prescription" && prescriptionItem) {
      return "sidebar-active";
    }

    return "";
  };

  return (
    <div className="bg-green rounded-[22px] p-4 flex flex-col justify-between gap-5 overflow-y-auto">
      <div className="">
        <div>
          <Image src={sideBarLogo} alt="sidebar logo missing" />
        </div>
        <div className="flex justify-center py-7">
          <ul className="flex flex-col gap-2 w-[220px]">
            <li
              className={`flex items-center gap-[10px] pl-6 cursor-pointer p-[8px] ${isActive("dashboard")} ${
                !isActive("dashboard") &&
                "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
              }`}
              onClick={() => pathHandler("dashboard")}
            >
              <div
                className={
                  isActive("dashboard")
                    ? "bg-gradient-primary p-2 rounded-md"
                    : "p-2"
                }
              >
                <Image src={dashboardIcon} alt="dashboard icon missing" />
              </div>
              <Typography
                size="md"
                className={`font-semibold ${isActive("dashboard") ? "text-green" : "text-white"}`}
              >
                Dashboard
              </Typography>
            </li>
            <li
              className={`flex items-center gap-[10px] pl-6 cursor-pointer p-[8px] ${isActive("prescription")} ${
                !isActive("prescription") &&
                "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
              }`}
              onClick={() => pathHandler("prescription")}
            >
              <div
                className={
                  isActive("prescription")
                    ? "bg-gradient-primary p-2 rounded-md"
                    : "p-2"
                }
              >
                <Image src={prescriptionIcon} alt="prescription icon missing" />
              </div>
              <Typography
                size="md"
                className={`font-semibold ${isActive("prescription") ? "text-green" : "text-white"}`}
              >
                Prescriptions
              </Typography>
              <div className="flex gap-7">
                <Image
                  src={
                    selectitem === "prescription"
                      ? prescriptionItem
                        ? downAngleIcon
                        : greenRightAngleIcon
                      : rightAngleIcon
                  }
                  alt="angle icon missing"
                />
              </div>
            </li>
            {prescriptionItem && (
              <div className="flex flex-col gap-2">
                <li
                  className={`flex items-center gap-[20px] cursor-pointer px-9 py-[15px] ${isActive("new-user")} ${
                    !isActive("new-user") &&
                    "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
                  }`}
                  onClick={() => pathHandler("new-user")}
                >
                  <div>
                    <Image src={circleIcon} alt="circle icon missing" />
                  </div>
                  <Typography size="sm" className={`font-semibold  text-white`}>
                    New Prescriptions
                  </Typography>
                </li>
                <li
                  className={`flex items-center gap-[20px] cursor-pointer px-9 py-[15px] ${isActive("invoices")} ${
                    !isActive("invoices") &&
                    "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
                  }`}
                  onClick={() => pathHandler("invoices")}
                >
                  <div>
                    <Image src={circleIcon} alt="circle icon missing" />
                  </div>
                  <Typography size="sm" className={`font-semibold text-white`}>
                    Invoices
                  </Typography>
                </li>
              </div>
            )}
            <li
              className={`flex items-center gap-[10px] pl-6 cursor-pointer p-[8px] ${isActive("order")} ${
                !isActive("order") &&
                "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
              }`}
              onClick={() => pathHandler("order")}
            >
              <div
                className={
                  isActive("order")
                    ? "bg-gradient-primary p-2 rounded-md"
                    : "p-2"
                }
              >
                <Image src={ordersIcon} alt="orders icon missing" />
              </div>
              <Typography
                size="md"
                className={`font-semibold ${isActive("order") ? "text-green" : "text-white"}`}
              >
                Orders
              </Typography>
            </li>
            <li
              className={`flex items-center gap-[10px] pl-6 cursor-pointer p-[8px] ${isActive("payment")} ${
                !isActive("payment") &&
                "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
              }`}
              onClick={() => pathHandler("payment")}
            >
              <div
                className={
                  isActive("payment")
                    ? "bg-gradient-primary p-2 rounded-md"
                    : "p-2"
                }
              >
                <Image src={paymentsIcon} alt="payments icon missing" />
              </div>
              <Typography
                size="md"
                className={`font-semibold ${isActive("payment") ? "text-green" : "text-white"}`}
              >
                Payments
              </Typography>
            </li>
            <li
              className={`flex items-center gap-[10px] pl-6 cursor-pointer p-[8px] ${isActive("transaction")} ${
                !isActive("transaction") &&
                "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
              }`}
              onClick={() => pathHandler("transaction")}
            >
              <div
                className={
                  isActive("transaction")
                    ? "bg-gradient-primary p-2 rounded-md"
                    : "p-2"
                }
              >
                <Image src={transactionsIcon} alt="transactions icon missing" />
              </div>
              <Typography
                size="md"
                className={`font-semibold ${isActive("transaction") ? "text-green" : "text-white"}`}
              >
                Transactions
              </Typography>
            </li>
            <li
              className={`flex items-center gap-[10px] pl-6 cursor-pointer p-[8px] ${isActive("user-management")} ${
                !isActive("user-management") &&
                "hover:bg-white hover:bg-opacity-20 hover:rounded-[10px]"
              }`}
              onClick={() => pathHandler("user-management")}
            >
              <div
                className={
                  isActive("user-management")
                    ? "bg-gradient-primary p-2 rounded-md"
                    : "p-2"
                }
              >
                <Image src={usersIcon} alt="users icon missing" />
              </div>
              <Typography
                size="md"
                className={`font-semibold ${isActive("user-management") ? "text-green" : "text-white"}`}
              >
                User Management
              </Typography>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <div
          className={`flex items-center justify-between px-6 cursor-pointer hover:bg-white-smoke  p-[8px] bg-white  rounded-[10px]`}
          // onClick={() => pathHandler('')}
        >
          <Typography size="md" className={`font-semiboldtext-white`}>
            Logout
          </Typography>
          <div className="">
            <Image src={logoutIcon} alt="logout icon missing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
