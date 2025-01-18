import { PiTipJarBold } from "react-icons/pi";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";

import { useSelector } from "react-redux";

const Pots = () => {
  const pots = useSelector((state) => state.finance.user.pots);
  const total = pots.reduce((prev, curr) => prev + curr.saved, 0)
  
  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <div className="flex justify-between mb-4">
        <p className="text-[#201f24] font-bold text-[16px]">Pots</p>
       
        <Link href="/views/pots"  className="flex items-center gap-2 cursor-pointer" ><p className="text-[#696868]">See Details</p>
     
            <MdArrowRight className="text-[#696868] text-[22px] " />
          </Link>
    
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
          <div key = {pot.id} className="flex items-center gap-1 wrap">
             <div className="w-1 h-[20px] lg:h-[40px] bg-[#9e2626]"></div>
            <div className="text-xs">
              <p className="text-[#696868] mb-1">{pot.name}</p>
              <span className="text-[#201f24] font-bold">${pot.saved}</span>
            </div>
          </div>
        )) }
      </div>
      </div>
    </div>
  );
};

export default Pots;
