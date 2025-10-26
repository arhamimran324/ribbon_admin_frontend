"use client";

import React, { PropsWithChildren, useEffect } from "react";

import Modal from "@/components/shared/custom-modal";
import Header from "@/components/shared/header";
import SidebarComponent from "@/components/shared/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetLogoutState,
  setIsDrawerOpen,
  setIsLogoutModel,
} from "@/redux/slices/app-slice";
import { useLogout } from "@/hooks/api/auth/useLogout";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { isLogoutModel, isDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { logoutStatic } = useLogout();
  // const userID = useAppSelector((state) => state.auth.user?.id);

  const handleLogout = () => {
    dispatch(setIsLogoutModel(false));
    // mutate({ user_id: userID });
    logoutStatic();
  };

  useEffect(() => {
    dispatch(resetLogoutState());
  }, [dispatch]);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isDrawerOpen]);

  return (
    <div className="h-screen flex overflow-hidden gap-5 p-5 relative bg-[#FAFBFA]">
      <div
        className={`
        fixed inset-y-0 left-0 w-64 flex-shrink-0 p-3
        transform transition-all duration-300
        ${isDrawerOpen ? "translate-x-0 z-50" : "-translate-x-full z-50"}
        xl:relative xl:transform-none xl:inset-auto xl:p-0
        ${!isDrawerOpen ? "opacity-0 invisible xl:opacity-100 xl:visible" : "opacity-100 visible"}
      `}
      >
        <SidebarComponent />
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => dispatch(setIsDrawerOpen(false))}
        />
      )}

      <div className="flex-1 flex flex-col gap-5 overflow-hidden z-10">
        {/* Header */}
        <div className="flex-shrink-0">
          <Header />
        </div>

        {/* <hr className="border-t border-light-gray flex-shrink-0" /> */}

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>

      <Modal
        isOpen={isLogoutModel}
        onClose={() => dispatch(setIsLogoutModel(false))}
        onConfirm={handleLogout}
        type="logout"
      />
    </div>
  );
};

export default DashboardLayout;
