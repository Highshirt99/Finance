import { useContext } from "react";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { Chart } from "@/components/Chart ";
import { getRandomColor } from "@/components/Chart ";
import { AppContext } from "./Provider";

const Budgets = () => {
const { budgets } = useContext(AppContext);

const chartData = budgets.length > 0 ? budgets.map((item) => {
  return {
    category: item.category,
    budget: Number(item.max),
    fill: getRandomColor(),
  };
}) : []

  return (
    <div className="bg-white rounded-md ">
      <div className="flex justify-between p-4">
        <p className="text-[#201f24] font-bold text-[16px]">Budgets</p>
        <div className="flex items-center gap-2">
          <p className="text-[#696868]">See Details</p>
          <Link href="/views/transactions">
            <MdArrowRight className="text-[#696868] text-[22px] " />
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center lg:gap-48 lg:flex-row">
        <Chart chartData = {chartData} />
        <div className=" flex gap-2 lg:flex-col  p-4 text-[10px]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-[26px] bg-[#f2cdac]"></div>
            <div>
              <p className="text-[#9da4aa] mb-2 text-[9px]">Personal Care</p>
              <span className="text-[#201f24] font-bold">$600</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1 h-[26px] bg-[#9e2626]"></div>
            <div>
              <p className="text-[#9da4aa] text-[9px] mb-2">Transportation</p>
              <span className="text-[#201f24] font-bold">$1600</span>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
};

export default Budgets;
