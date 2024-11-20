"use client";

import { useContext } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/data/NavLinks ";
import { AppContext } from "./Provider";

const MobileSidebar = () => {
  const { activeMenu, setActiveMenu } = useContext(AppContext);

  return (
    <div className="lg:hidden block fixed bottom-0 px-4 pt-2 text-grey-300 md:h-[66px] md:px-10 bg-[#201f24] rounded-t-lg  h-auto w-full  p-6">
      <ul className="flex gap-8 items-center justify-between">
        {navLinks.map((navItem) => (
          <li
            key={navItem.id}
            className={` text-[16px] ${
              activeMenu === navItem.id
                ? "bg-[#ffffff] text-[#25605e] border-b-2 border-b-[#25605e]"
                : "bg-none text-[#b3b3b3]"
            } w-[100px] md:w-[150px] md:p-1 p-2 rounded-md`}
            onClick={() => {
              setActiveMenu(navItem.id);
            }}
          >
            <Link
              href={navItem.link}
              className="flex md:flex-col justify-center md:justify-normal items-center md:gap-1"
            >
              {navItem.icon}
              <p
                className={`text-preset-5 hidden text-xs font-bold  md:block ${
                  navItem.id === activeMenu ? "text-gray-900" : "text-grey-300"
                }`}
              >
                {navItem.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileSidebar;
