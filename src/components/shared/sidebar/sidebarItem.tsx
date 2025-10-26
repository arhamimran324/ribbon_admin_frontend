"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDrawerOpen } from "@/redux/slices/app-slice";
import { SidebarItemProps } from "@/types";
import Iconify from "../iconify";
import { Typography } from "../typography";

export default function SidebarItem({
  icon,
  text,
  onToggle,
  path,
  size = "md",
  subMenu = null,
  expanded = false,
  subItem = false,
}: SidebarItemProps & { onToggle?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    (path && pathname?.includes(path)) ||
    (subMenu &&
      subMenu.some(
        (subItem) =>
          typeof subItem?.path === "string" && pathname?.includes(subItem.path),
      ));

  const { isDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const closeSidebar = () => {
    if (isDrawerOpen) dispatch(setIsDrawerOpen(false));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
    if (path) {
      router.push(path);
      closeSidebar();
    }
  };

  const content = (
    <>
      <span
        className={`
          flex items-center justify-center rounded-md p-1.5
          ${!subItem && "group-hover:bg-primary-gradient"}  
          ${!subItem && isActive && "bg-primary-gradient"}
        `}
      >
        {icon ? (
          <Image src={icon} alt="icon" width={20} height={20} />
        ) : (
          <Iconify icon="mdi:dot" width={24} height={24} />
        )}
      </span>

      <Typography
        size={size === "sm" ? "sm" : "md"}
        className="whitespace-nowrap overflow-hidden text-start"
      >
        {text}
      </Typography>

      {subMenu && (
        <span
          className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform ${
            expanded ? "rotate-90" : "rotate-0"
          }`}
        >
          <Iconify icon="tabler:chevron-right" width={16} height={16} />
        </span>
      )}
    </>
  );

  return (
    <li className="overflow-hidden">
      {!subItem ? (
        <button
          onClick={handleClick}
          className={`
            group relative my-[4px] flex w-full cursor-pointer items-center gap-2 rounded-md px-4 
            ${subItem ? "py-2.5 hover:bg-white/20 hover:text-white" : "py-2.5"} 
            font-medium 
            ${isActive ? "text-white bg-[#0F1419]" : "text-white hover:bg-[#0F1419] hover:text-white"}
            ${subItem && isActive ? "bg-white/20 text-white" : ""}
          `}
        >
          {content}
        </button>
      ) : (
        path && (
          <Link
            href={path}
            onClick={closeSidebar}
            className={`
            group relative my-[4px] flex w-full cursor-pointer items-center gap-2 rounded-md px-6 
            ${subItem ? "py-2.5 hover:bg-white/20 hover:text-white" : "py-4"} 
            font-medium 
            ${isActive ? "text-dark-charcoal bg-white" : "text-white hover:bg-white hover:text-dark-charcoal"}
            ${subItem && isActive ? "bg-white/20 text-white" : ""}
          `}
          >
            {content}
          </Link>
        )
      )}
      {subMenu && !subItem && (
        <ul
          className="sub-menu transition-all duration-300 ease-in-out overflow-hidden"
          style={{ height: expanded ? `${subMenu.length * 64}px` : "0px" }}
        >
          {subMenu?.map((item, index) => <SidebarItem key={index} {...item} />)}
        </ul>
      )}
    </li>
  );
}
