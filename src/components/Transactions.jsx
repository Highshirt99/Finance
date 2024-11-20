import { MdArrowRight } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

const Transactions = () => {
  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <div className="flex justify-between p-4">
        <p className="text-[#201f24] font-bold text-[16px]">Transactions</p>
        <div className="flex items-center gap-2">
          <p className="text-[#696868]">See Details</p>
          <Link href="/views/transactions">
            <MdArrowRight className="text-[#696868] text-[22px] " />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#277c77] text-white flex justify-center items-center w-8 h-8 rounded-[50%] p-1">
            <FaUser />
          </div>
          <p className="text-[#696868] font-bold">Loven</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[#201f24] font-bold">+$300</span>
          <span className="text-[10px] text-[#696868]">18/10/2024</span>
        </div>
      </div>
      <div className=" h-[2px] px-4 bg-[#f4f4f4] w-full"></div>
    </div>
  );
};

export default Transactions;
