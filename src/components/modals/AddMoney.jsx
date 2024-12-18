import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AddMoney = ({ setAddMoneyModalOpen, pots, pot }) => {
  const myWidth = ((pot.saved / pot.target) * 100).toFixed(2) + "%";
  const [amount, setAmount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    const index = pots.findIndex((item) => pot.id === item.id);

    if (pot.saved + Number(amount) <= pots[index].target) {
      pots[index].saved = pots[index].saved + Number(data.amount);
      setAddMoneyModalOpen(false);

      toast.success("Money added successfully.");
    } else if (pot.saved + Number(amount) > pots[index].target) {
      toast.error("Amount exceeds target.");
    }
    setAmount(0);
  };



  return (
    <div className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center items-center fixed inset-0 z-[50] bg-black bg-opacity-10 scrollbar-hide">
      <div className="bg-white  lg:w-[400px] w-[350px] h-fit p-4 rounded-md  bottom-[80px] relative top-1">
        <div>
          <h1 className="font-[600]  text-[14px]">
            Add to &apos;{pot.name}&apos;{" "}
          </h1>
          <IoMdClose
            className=" cursor-pointer w-[10px]  absolute top-3 right-5"
            onClick={() => setAddMoneyModalOpen(false)}
          />
          <span className="text-[10px] text-[#a8b1be]">
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </span>
        </div>

        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between w-full">
            <div className="w-full">
              <div className="flex items-center justify-between w-full ">
                <span className="text-[#a3a0a9] text-[9px]">New Amount</span>
                <p className="font-bold ml-3 mt-1 text-[20px]">
                  ${(pot.saved + Number(amount)).toFixed(2)}
                </p>
              </div>
              <div className="w-full rounded-full h-[5px] my-4 bg-[#f8f4f0] relative">
                <div
                  className="absolute bg-green-600 h-[5px] rounded-full"
                  style={{
                    width: myWidth,
                  }}
                />
              </div>
              <div className="text-[10px] text-[#9d9a9b] flex justify-between my-4">
                <span className="text-green-600">{myWidth}</span>
                <span>Target of ${Number(pot.target).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="font-[600]  text-[12px] text-gray-400">
              Amount to Add
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              {...register("amount", { required: true })}
              onChange={(e) => {
                setAmount(e.target.value);
              
              }}
              className={`${
                errors.amount ? " border-red-600" : "border-gray-300 "
              } border text-[12px]   rounded-md p-2 text-gray-600 outline-none appearance-none w-full mt-1 focus:border-gray-700`}
            />
            {errors.amount && (
              <p className=" font-medium text-red-600 text-[11px]">
                Field is required.
              </p>
            )}
          </div>

          <button className=" hover:bg-opacity-50 text-white ease-in-out duration-500 p-2 font-[500] mt-3 rounded-lg text-center text-[12px] bg-black cursor-pointer">
            <span>Confirm Addition</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoney;
