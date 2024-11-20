"use client";

import { IoMdClose } from "react-icons/io";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

const AddTransaction = ({ setTransactionModalOpen }) => {
  const transactionCategories = [
    {
      name: "Entertainment",
      id: 1,
    },
    {
      name: "Bills",
      id: 2,
    },
    {
      name: "Groceries",
      id: 3,
    },
    {
      name: "DiningOut",
      id: 4,
    },
    {
      name: "Transportation",
      id: 5,
    },
    {
      name: "PersonalCare",
      id: 6,
    },
    {
      name: "Education",
      id: 7,
    },
    {
      name: "Lifestyle",
      id: 8,
    },
    {
      name: "Shopping",
      id: 9,
    },
    {
      name: "General",
      id: 10,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
    setTransactionModalOpen(false);

    toast.success("Transaction added successfully.");
  };

  return (
    <div className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center items-center fixed inset-0 z-[50] bg-black bg-opacity-10 scrollbar-hide">
      <div className="bg-white  lg:w-[400px] w-[350px] h-fit p-4 rounded-md  bottom-[80px] relative top-1">
        <div>
          <h1 className="font-[600]  text-[14px]">Add New Transaction</h1>
          <IoMdClose
            className=" cursor-pointer w-[10px]  absolute top-3 right-5"
            onClick={() => setTransactionModalOpen(false)}
          />
        </div>
        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="font-[600] e text-[12px] text-gray-400">
              Transaction Name
            </label>
            <input
              type="text"
              placeholder="e.g. Urban Services Hub"
              {...register("name", { required: true })}
              className={`${
                errors.title ? " border-red-600" : "border-gray-300 "
              } border text-[12px]   rounded-md p-2 text-gray-600 outline-none w-full mt-1 focus:border-gray-700`}
            />
            {errors.name && (
              <p className=" font-medium text-red-600 text-[11px]">
                Field is required.
              </p>
            )}
          </div>
          <div>
            <label className="font-[600] e text-[12px] text-gray-400">
              Date
            </label>
            <input
              type="date"
              placeholder=" Pick a date"
              {...register("date", { required: true })}
              className={`${
                errors.title ? " border-red-600" : "border-gray-300 "
              } border text-[12px] text-gray-600 rounded-md p-2 outline-none w-full mt-1 focus:border-gray-700`}
            />
            {errors.date && (
              <p className=" font-medium text-red-600 text-[11px]">
                Field is required.
              </p>
            )}
          </div>
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
              Amount
            </label>
            <input
              type="number"
              placeholder="e.g. $1000"
              {...register("amount", { required: true })}
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

          <div className="flex items-center gap-3 text-gray-600">
            <label className="font-[600]  text-[12px] ">Recurring</label>
            <input type="checkbox" name="" id="" {...register("recurring")} />
          </div>

          <button className=" hover:bg-opacity-50 text-white ease-in-out duration-500 p-2 font-[500] mt-3 rounded-lg text-center text-[12px] bg-black cursor-pointer">
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
