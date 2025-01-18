import { MdArrowRight } from "react-icons/md";
import Link from "next/link";

import { useSelector } from "react-redux";

const RecurringBills = () => {
   
  const recurringTransactions = useSelector((state) => state.finance.user.recurringBills)
  

  const paidBills = recurringTransactions.reduce((acc, curr) => {
    return acc + Number(curr.amount)
   }, 0);

  return (
    <div className="p-3 mb-20 bg-white rounded-md lg:mb-0">
    <div className="flex justify-between ">
      <p className="text-[#201f24] font-bold text-[16px]">Recurring Bills</p>
     
      <Link href="/views/transactions" className="flex items-center gap-2 cursor-pointer">
        <p className="text-[#696868]  cursor-pointer">See Details</p>
       
          <MdArrowRight className="text-[#696868] text-[22px] " />
        </Link>
   
    </div>

  <div className="flex flex-col p-4 space-y-3">
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