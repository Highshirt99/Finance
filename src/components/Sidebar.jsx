"use client";

import { useContext } from "react";
import { PiArrowFatLineLeftFill } from "react-icons/pi";
import Link from "next/link";
import { navLinks } from "@/lib/data/NavLinks ";
import { AppContext } from "./Provider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, minimizeMenu, setMinimizeMenu } =
    useContext(AppContext);
  const toggleMenu = () => {
    setMinimizeMenu(!minimizeMenu);
  };

  return (
    <nav
      className={`bg-[#201f24] rounded-t-r-md  text-[#b3b3b3] hidden lg:flex p-6 fixed gap-8 left-0 flex-col rounded-r-md h-full transition-all duration-500 ${
        minimizeMenu ? "w-[5%]" : "w-[15%]"
      }`}
    >
      <div className="font-bold text-[2.5rem] text-white">
        <p className={`${minimizeMenu ? "block" : "hidden"}`}>F</p>
        <p className={`${minimizeMenu ? "hidden" : "block"}`}>Finance</p>
      </div>
      <ul className="flex flex-col gap-8 ">
        {navLinks.map((navItem) => (
          <li
            key={navItem.id}
            className={` font-semibold text-[14px] ${
              activeMenu === navItem.id && !minimizeMenu
                ? "bg-[#ffffff] text-[#25605e] w-full border-l-[#25605e] border-l-2"
                : "bg-none text-[#b3b3b3]"
            } rounded-md p-1`}
            onClick={() => {
              setActiveMenu(navItem.id);
            }}
          >
            <Link
              href={navItem.link}
              className={`flex items-center gap-3 ${
                activeMenu === navItem.id ? "text-[#25605e]" : "text-[#b3b3b3]"
              }`}
            >
              {navItem.icon}
              <span
                className={`${minimizeMenu ? "hidden" : "block"} ${
                  activeMenu === navItem.id ? "text-black" : "text-[#b3b3b3]"
                }
                }`}
              >
                {navItem.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="absolute bottom-8 w-full flex items-center cursor-pointer gap-3 text-[#b3b3b3] "
        onClick={toggleMenu}
      >
        <PiArrowFatLineLeftFill
          className={`${
            minimizeMenu ? "rotate-180" : "rotate-0"
          } transition-all duration-500`}
        />
        <span className={`${minimizeMenu ? "hidden" : "block"}`}>
          Minimize Menu
        </span>
      </div>
    </nav>
  );
};

export default Sidebar;
