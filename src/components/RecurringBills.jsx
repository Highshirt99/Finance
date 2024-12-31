import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "./Provider";

const RecurringBills = () => {
   const {transactionsData} = useContext(AppContext)
  const recurringTransactions = transactionsData?.filter(
    (item) => item.recurring
  );

  const paidBills = recurringTransactions.reduce((acc, curr) => {
    return acc + Number(curr.amount)
   }, 0);

  return (
    <div className="bg-white rounded-md p-3 mb-20 lg:mb-0">
    <div className=" flex justify-between">
      <p className="text-[#201f24] font-bold text-[16px]">Recurring Bills</p>
      <div className="flex gap-2 items-center">
        <p className="text-[#696868]">See Details</p>
        <Link href="/views/transactions">
          <MdArrowRight className="text-[#696868] text-[22px] " />
        </Link>
      </div>
    </div>

  <div className="flex p-4 flex-col space-y-3">
      <div className="flex justify-between items-center w-full bg-[#f8f4f0] p-3 rounded-md border-l-2 border-l-[#3b8884]">
      <p className="text-[#a5afb7] text-[11px]">Paid Bills</p>
      <span className="text-[#434247] text-[11px] font-bold">${paidBills.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center w-full bg-[#f8f4f0] p-3 rounded-md border-l-2 border-l-[#f2cdac]">
      <p className="text-[#a5afb7] text-[11px]">Total Upcoming</p>
      <span className="text-[#434247] text-[11px]  font-bold">$0.00</span>
      </div>
      <div className="flex justify-between items-center w-full bg-[#f8f4f0] p-3 rounded-md border-l-2 border-l-[#82c9d7]">
      <p className="text-[#a5afb7] text-[11px]">Due Soon</p>
      <span className="text-[#434247] text-[11px]  font-bold">$0.00</span>
      </div>
  </div>
  </div>
  )
}

export default RecurringBills