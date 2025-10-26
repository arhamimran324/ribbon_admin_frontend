"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDrawerOpen } from "@/redux/slices/app-slice";
import Iconify from "../iconify";

const DrawerCard = ({ children }: any) => {
  const { isDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        dispatch(setIsDrawerOpen(false));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <>
      <button
        className="xl:hidden flex items-center justify-center cursor-pointer p-2 bg-white rounded-full shadow-md"
        onClick={toggleDrawer}
      >
        <Iconify
          icon="hugeicons:menu-02"
          width="32"
          height="32"
          color="#40E8F3"
        />
      </button>
      <div
        className={`fixed bottom-2 h-full w-72 transform transition-transform duration-300 z-50 ${
          isDrawerOpen ? "translate-x-0 left-2" : "-translate-x-full left-0"
        }`}
      >
        <div className="flex justify-end ">
          <button
            onClick={toggleDrawer}
            className="z-50 relative top-9 right-4"
          >
            <Iconify
              icon="material-symbols:close"
              className={"relative bg-white rounded-full p-1"}
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="">{children}</div>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
};

export default DrawerCard;
