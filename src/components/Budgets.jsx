import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { Chart } from "@/components/Chart ";
import { getRandomColor } from "@/components/Chart ";
import { useSelector } from "react-redux";

const Budgets = () => {
  const budgets  = useSelector(state => state.finance.user.budgets);

  const chartData =
    budgets?.length > 0
      ? budgets.map((item) => {
          return {
            category: item.category,
            budget: Number(item.max),
            fill: getRandomColor(),
          };
        })
      : [];

  return (
    <div className="bg-white rounded-md h-fit">
      <div className="flex justify-between p-4">
        <p className="text-[#201f24] font-bold text-[16px]">Budgets</p>
       
        <Link href="/views/transactions" className="flex items-center gap-2 cursor-pointer">
          <p className="text-[#696868]">See Details</p>
       
            <MdArrowRight className="text-[#696868] text-[22px] " />
          </Link>
        
      </div>
      {budgets?.length > 0 ? (
        <div className="flex flex-col justify-center lg:gap-48 lg:flex-row ">
          <Chart chartData={chartData} />

          <div className=" flex gap-2 lg:flex-col  p-4 text-[10px]">
            {budgets?.map((budget) => (
              <div key={budget.id} className="flex items-center gap-2">
                <div className="w-1 h-[26px] bg-[#f2cdac]"></div>
                <div>
                  <p className="text-[#9da4aa] mb-2 text-[9px]">
                    {budget.category}
                  </p>
                  <span className="text-[#201f24] font-bold">
                    ${budget.spent.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="p-4 text-gray-600">No data</p>
      )}
    </div>
  );
};

export default Budgets;
