import React from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPot } from "@/lib/redux/slice ";

const AddPot = ({ setPotModalOpen, pots, setPots }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(addPot(data));
    setPotModalOpen(false);

    toast.success("Pot added successfully.");
  };

  return (
    <div className="backdrop-blur-sm max-md:mx-2 overflow-scroll shadow-md flex justify-center items-center fixed inset-0 z-[50] bg-black bg-opacity-10 scrollbar-hide">
      <div className="bg-white  lg:w-[400px] w-[350px] h-fit p-4 rounded-md  bottom-[80px] relative top-1">
        <div>
          <h1 className="font-[600]  text-[14px]">Add New Pot</h1>
          <IoMdClose
            className=" cursor-pointer w-[10px]  absolute top-3 right-5"
            onClick={() => setPotModalOpen(false)}
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
              Pot Name
            </label>
            <input
              type="text"
              placeholder="e.g. Rainy Days"
              {...register("name", { required: true })}
              className={`${
                errors.name ? " border-red-600" : "border-gray-300 "
              } border text-[12px]   rounded-md p-2 text-gray-600 outline-none appearance-none w-full mt-1 focus:border-gray-700`}
            />
            {errors.name && (
              <p className=" font-medium text-red-600 text-[11px]">
                Field is required.
              </p>
            )}
          </div>
          <div>
            <label className="font-[600]  text-[12px] text-gray-400">
              Target Amount
            </label>
            <input
              type="number"
              placeholder="e.g. $2000"
              {...register("target", { required: true })}
              className={`${
                errors.target ? " border-red-600" : "border-gray-300 "
              } border text-[12px]   rounded-md p-2 text-gray-600 outline-none appearance-none w-full mt-1 focus:border-gray-700`}
            />
            {errors.target && (
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

export default AddPot;
