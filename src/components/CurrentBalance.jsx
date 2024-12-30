import React, { useContext } from 'react'
import { AppContext } from './Provider';

const CurrentBalance = () => {
   const {transactionsData} = useContext(AppContext)

    const totalTransaction = transactionsData.reduce(
      (prev, curr) => prev + Number(curr.amount),
      0
    );

    const getCurrentBalance = () => {
      if(totalTransaction < 0){
        return totalTransaction.toString().slice(1)
      }
      else{
        return totalTransaction
      }
    }
  return (

    <div className=' bg-[#201f24] flex flex-col space-y-2 p-4  rounded-md '><p className='text-sm text-[#e8dfd8]'>Current Balance</p>
    <h1 className='font-bold text-[26px] text-white'>
    <span>{totalTransaction < 0 ? "-" : ""}</span>
      ${(Number(getCurrentBalance())).toFixed(2)}</h1>
    </div>
  )
}

export default CurrentBalance