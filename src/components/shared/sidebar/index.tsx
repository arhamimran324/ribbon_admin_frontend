"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { content } from "@/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setExpandedIndex,
  setIsDrawerOpen,
  setIsLogoutModel,
} from "@/redux/slices/app-slice";
import Iconify from "../iconify";
import { Typography } from "../typography";
import SidebarItem from "./sidebarItem";
// import { useSetSinglePaymentRecord } from "@/hooks/api/dashboard/useSetSinglePaymentRecord";
import CountdownTimerLoader from "../loader/CountdownTimerLoader";
import CountdownTimer from "../countDownTimer";

function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isDrawerOpen } = useAppSelector((state) => state.app);
  const handleLogout = () => {
    dispatch(setIsLogoutModel(true));
    if (isDrawerOpen) dispatch(setIsDrawerOpen(false));
  };

  // const selectedId = useAppSelector((state) => state.auth.user?.id)
  // const { mutate, data, isPending } = useSetSinglePaymentRecord()

  // useEffect(() => {
  //   if (selectedId) {
  //     const formData = new FormData()
  //     formData.append("user_id", selectedId.toString())
  //     mutate(formData)
  //   }
  // }, [selectedId])

  // const fixedLaunchDate = data && data?.user_record[0]?.end_time

  return (
    <div className="relative">
      <aside className={` h-[calc(100vh-1.5rem)] xl:h-[calc(100vh-2.5rem)]`}>
        <nav
          className={`flex h-full flex-col bg-primary-text shadow-sm rounded-2xl`}
        >
          {/* Header and Logo */}
          <span className="block xl:hidden">
            <Iconify
              icon="mingcute:close-line"
              onClick={() => dispatch(setIsDrawerOpen(false))}
              className="absolute bg-white rounded-full p-0.5 right-2 top-2 cursor-pointer"
              width={14}
              height={14}
              color="black"
            />
          </span>

          <div
            onClick={() => router.push("/dashboard")}
            className="flex items-center  justify-center py-6"
          >
            <Image
              width={100}
              height={100}
              // src={"/assets/gif/logo.gif"}
              src={"/assets/svg/logo.svg"}
              alt="Dashboard Logo"
              className="cursor-pointer"
            />
          </div>
          <div className="xl:hidden block">
            {/* {isPending || !data?.user_record[0]?.end_time ? (
        <CountdownTimerLoader />
      ) : (
        <CountdownTimer launchdate={fixedLaunchDate} />
      )} */}
          </div>
          {/*  Menu Items */}
          <ul className="flex-1 px-4 overflow-y-auto">{children}</ul>
          {/* Logout Button */}
          <div className="p-3 cursor-pointer mt-auto" onClick={handleLogout}>
            <div className="flex items-center justify-between gap-4 bg-black rounded-[10px] w-full px-5 py-4">
              <button>
                <Typography size="md" className="text-white font-semibold">
                  Logout
                </Typography>
              </button>
              <Iconify
                icon="line-md:logout"
                className="rotate-180"
                width={20}
                height={20}
                color={"#fff"}
              />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

const SidebarComponent = () => {
  const dispatch = useAppDispatch();
  const { expandedIndex } = useAppSelector((state) => state.app);
  const pathname = usePathname();

  // const menuItems = section === 'crm' ? content.sideBar.crm : content.sideBar.cms;
  const menuItems = content.sideBar.pharmacy;

  // useEffect(() => {
  //   const activeMenu = menuItems?.find(
  //     (item) =>
  //       item.subMenu?.some((subItem) => pathname?.includes(subItem.path)) ??
  //       false,
  //   );

  //   if (activeMenu) {
  //     const activeIndex = menuItems?.indexOf(activeMenu);

  //     if (activeIndex !== -1) {
  //       dispatch(setExpandedIndex(activeIndex));
  //     }
  //   } else {
  //     dispatch(setExpandedIndex(null));
  //   }
  // }, [dispatch, menuItems, pathname]);

  const handleExpand = (index: number | null) => {
    dispatch(setExpandedIndex(index));
  };
  return (
    <Sidebar>
      {menuItems?.map((item: any, index: any) => (
        <React.Fragment key={index}>
          <SidebarItem
            {...item}
            expanded={expandedIndex === index}
            onToggle={() =>
              handleExpand(expandedIndex === index ? null : index)
            }
          />
        </React.Fragment>
      ))}
    </Sidebar>
  );
};

export default SidebarComponent;
