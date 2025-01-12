import React from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { transactionCategories } from "./AddTransaction";
import { addBudget } from "@/lib/redux/slice ";
import { useDispatch } from "react-redux";

const AddBudget = ({ setBudgetModalOpen }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    dispatch(addBudget(data));

    setBudgetModalOpen(false);

    toast.success("Budget added successfully.");
  };

  return (
    <div className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center items-center fixed inset-0 z-[50] bg-black bg-opacity-10 scrollbar-hide">
      <div className="bg-white  lg:w-[400px] w-[350px] h-fit p-4 rounded-md  bottom-[80px] relative top-1">
        <div>
          <h1 className="font-[600]  text-[14px]">Add New Budget</h1>
          <IoMdClose
            className=" cursor-pointer w-[10px]  absolute top-3 right-5"
            onClick={() => setBudgetModalOpen(false)}
          />
          <span className="text-[10px] text-[#a8b1be]">
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </span>
        </div>

        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="font-[600]  text-[12px] text-gray-400">
              Category
            </label>

            <select
              {...register("category", { required: true })}
              className={`${
                errors.status ? " border-red-600" : "border-gray-300  "
              } border text-[12px] cursor-pointer text-gray-600  rounded-md p-2 outline-none w-full mt-1 focus:border-gray-700`}
              placeholder="Select a category"
            >
              {transactionCategories.map((category) => (
                <option key={category.id} value={category.name} className="">
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className=" font-medium text-red-600 text-[11px]">
                Field is required.
              </p>
            )}
          </div>

          <div>
            <label className="font-[600]  text-[12px] text-gray-400">
              Maximum spend
            </label>
            <input
              type="number"
              placeholder="e.g. $2000"
              {...register("max", { required: true })}
              className={`${
                errors.max ? " border-red-600" : "border-gray-300 "
              } border text-[12px]   rounded-md p-2 text-gray-600 outline-none appearance-none w-full mt-1 focus:border-gray-700`}
            />
            {errors.max && (
              <p className=" font-medium text-red-600 text-[11px]">
                Field is required.
              </p>
            )}
          </div>

          <button className=" hover:bg-opacity-50 text-white ease-in-out duration-500 p-2 font-[500] mt-3 rounded-lg text-center text-[12px] bg-black cursor-pointer">
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudget;
