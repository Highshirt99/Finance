import { PiTipJarBold } from "react-icons/pi";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "./Provider";

const Pots = () => {
  const {pots} = useContext(AppContext)
  const total = pots.reduce((prev, curr) => prev + Number(curr.target), 0)
  
  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <div className="flex justify-between mb-4">
        <p className="text-[#201f24] font-bold text-[16px]">Pots</p>
        <div className="flex items-center gap-2">
          <p className="text-[#696868]">See Details</p>
          <Link href="/views/pots">
            <MdArrowRight className="text-[#696868] text-[22px] " />
          </Link>
        </div>
      </div>

      <div className="flex flex-col space-4 lg:flex-row lg:items-center">
        <div className="bg-[#f8f4f0] h-[60px] p-4 flex gap-3 items-center rounded-md  w-full lg:w-[180px] ">
          <PiTipJarBold className="text-[30px] text-[#25605e]" />
          <div className="w-[150px]">
            <span className="text-[#696868]">Pots</span>
            <h1 className="text-[#201f24] font-bold text-[18px]">${total}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
         
        { pots.map((pot) => (
          <div key = {pot.id} className="flex items-center gap-3 wrap">
             <div className="w-1 h-[30px] lg:h-[60px] bg-[#9e2626]"></div>
            <div>
              <p className="text-[#696868] mb-1">{pot.name}</p>
              <span className="text-[#201f24] font-bold">${pot.target}</span>
            </div>
          </div>
        )) }
      </div>
      </div>
    </div>
  );
};

export default Pots;
