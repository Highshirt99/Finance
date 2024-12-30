import React, { useContext } from "react";
import { AppContext } from "./Provider";

const Income = () => {
  const { transactionsData } = useContext(AppContext);

  const income = transactionsData?.filter((item) => Number(item.amount) > 0)

  const totalIncome = income.reduce(
    (prev, curr) => prev + Number(curr.amount),
    0
  );
  return (
    <div className=" bg-[#ffffff] flex flex-col space-y-2 p-4  rounded-md">
      <p className="text-sm text-[#bac2c6]">Income</p>
      <h1 className="font-bold text-[26px] text-[#2d1f24]">${totalIncome.toFixed(2)}</h1>
    </div>
  );
};

export default Income;
