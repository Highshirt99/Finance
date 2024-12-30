import React, { useContext } from 'react'
import { AppContext } from './Provider';

const Expenses = () => {
  const {transactionsData} = useContext(AppContext)
  const expenses = transactionsData?.filter((item) => Number(item.amount) < 0)
  const totalExpenses = expenses.reduce(
    (prev, curr) => prev + Number(curr.amount.slice(1)),
    0
  );

  
  return (
    <div className=' bg-[#ffffff] flex flex-col space-y-2 p-4  rounded-md '><p className='text-sm text-[#bac2c6]'>Expenses</p>
    <h1 className='font-bold text-[26px] text-[#2d1f24]'>
     
      $ {totalExpenses.toFixed(2)}</h1>
    </div>
  )
}

export default Expenses