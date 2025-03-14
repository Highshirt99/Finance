import { MdArrowRight } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";


const Transactions = () => {
  const  transactionsData  = useSelector((state) => state.finance.user.transactions)

  return (
    <div className="p-6 bg-white rounded-md h-fit ">
      <div className="flex justify-between ">
        <p className="text-[#201f24] font-bold text-[16px]">Transactions</p>
      
        <Link href="/views/transactions" className="flex items-center gap-2 cursor-pointer">
          <p className="text-[#696868]">See Details</p>
          
            <MdArrowRight className="text-[#696868] text-[22px] " />
          </Link>
       
      </div>

      <div className="flex flex-col gap-1">
        {transactionsData?.length > 0 ? (
          transactionsData.slice(0, 4).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between px-4 py-1 "
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#277c77] text-white flex justify-center items-center w-8 h-8 rounded-[50%] p-1">
                  <FaUser />
                </div>
                <p className="font-bold ">{transaction.name}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span
                  className={` ${
                    transaction.amount > 0 ? "text-green-500" : "text-black"
                  }  font-bold`}
                >
                  <span>{transaction.amount > 0 ? "+" : "-"}</span>$
                  {transaction.amount < 0
                    ? transaction.amount.slice(1)
                    : transaction.amount}
                </span>
                <span className="text-[10px] text-[#696868]">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-600 relative right-[0.8rem]">No data</p>
        )}
      </div>
{transactionsData?.length > 0 &&  <div className=" h-[2px] px-4 bg-[#f4f4f4] w-full"></div>}
    
    </div>
  );
};

export default Transactions;
