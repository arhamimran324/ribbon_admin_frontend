"use client";

import React, { useState } from "react";

import { content } from "@/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDrawerOpen } from "@/redux/slices/app-slice";
import HeaderProfileDropDown from "../header-profile-dropdown";
import Iconify from "../iconify";
import NotificationDropdown from "../notification-dropdown";
// import { useSetSinglePaymentRecord } from "@/hooks/api/dashboard/useSetSinglePaymentRecord";
// import CountdownTimer from "../countDownTimer";
// import CountdownTimerLoader from "../loader/CountdownTimerLoader";
import SubscriptionModal from "../modal/SubscriptionModal";

const Header = () => {
  const dispatch = useAppDispatch();
  const { isDrawerOpen } = useAppSelector((state) => state.app);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedId = useAppSelector((state) => state.auth.user?.id);
  // const { mutate, data, isPending } = useSetSinglePaymentRecord();
  // useEffect(() => {
  //   if (selectedId) {
  //     const formData = new FormData();
  //     formData.append("user_id", selectedId.toString());
  //     mutate(formData);
  //   }
  // }, [selectedId, mutate]);

  // useEffect(() => {
  //   // Show modal if no end_time is available and data is loaded
  //   if (!isPending && data && !data?.user_record[0]?.end_time) {
  //     setIsModalOpen(true);
  //   } else {
  //     setIsModalOpen(false);
  //   }
  // }, [data, isPending]);

  // const fixedLaunchDate = data?.user_record[0]?.end_time;
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
  const toggleDrawer = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  const profileDropdownOptions = content?.dropdownItems;
  const notifications = content?.notificationsData;

  return (
    <>
      <div className="flex gap-1 w-full justify-between p-3 items-center bg-white rounded-2xl">
        <div className="xl:block hidden">
          {/* {isPending ? (
        <CountdownTimerLoader />
      ) : (
        fixedLaunchDate &&   <CountdownTimer launchdate={fixedLaunchDate} />
      )} */}
        </div>
        <div className="">
          <button
            className="xl:hidden flex items-center justify-center cursor-pointer p-2 bg-white rounded-full shadow-md "
            onClick={toggleDrawer}
          >
            <Iconify
              icon="hugeicons:menu-02"
              width="32"
              height="32"
              color="#1a5f44"
            />
          </button>
        </div>

        <div className="flex justify-between lg:justify-end items-center">
          <div className="flex justify-between gap-2 md:justify-end items-center md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="cursor-pointer">
                <NotificationDropdown
                  className=""
                  notifications={notifications}
                />
              </div>
              <div className="cursor-pointer">
                <HeaderProfileDropDown
                  dropdownItems={profileDropdownOptions}
                  className=""
                  placeholder={"/assets/svg/header-profile-image.svg"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
