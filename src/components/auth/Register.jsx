"use client";

import { useState } from "react";
import Image from "next/image";
import illustration from "/public/illustration.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/auth ";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return registerUser({ name, email, password });
    },
    onSuccess: (data) => {
      toast.success(data.data?.message);

      router.push("/auth/login", { scroll: false });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen px-8 lg:justify-normal lg:space-x-60 ">
      <div className="hidden  lg:block w-[30%] h-[90%] relative">
        <h1 className="absolute font-bold text-white top-4 left-5 text-[1.8rem] tracking-wide">
          Finance
        </h1>
        <Image
          src={illustration}
          alt="illustration"
          className="object-cover rounded-[20px] h-[100%]"
        />
        <div className="absolute text-white bottom-4 left-20 w-[80%] flex flex-col space-y-2">
          <h1 className="font-bold text-[1.8rem] tracking-wide">
            Keep track of your money and save for your future
          </h1>
          <p className="text-sm tracking-wide text-[10px]">
            Keep track of your money and save for your future Personal finance
            app puts you in control of your spending. Track transactions, set
            budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
      <div className="flex flex-col p-8 space-y-4 bg-white rounded-[20px] lg:w-[30%] lg:h-[70%] w-full">
        <h5 className="text-[2rem] font-bold">Register</h5>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#98908b] font-bold ">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              placeholder="Name"
              className="p-2 rounded-md outline-none border border-[#98908b] placeholder:text-[#98908b] w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-right text-[10px]">
                Name is required.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#98908b] font-bold">
              Email
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              id="email"
              placeholder="Email"
              className="p-2 rounded-md outline-none border border-[#98908b] placeholder:text-[#98908b] w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-right text-[10px]">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[#98908b] font-bold">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: true, min: 8 })}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="p-2 rounded-md outline-none border border-[#98908b] placeholder:text-[#98908b] w-full"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-4 top-4 cursor-pointer text-[#98908b]"
                  onClick={toggleShowPassword}
                />
              ) : (
                <FaEye
                  className="absolute right-4 top-4 cursor-pointer text-[#98908b]"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-right text-[10px]">
                Password must be at least 8 characters.
              </p>
            )}
          </div>

          <div className="w-full  p-3 flex items-center justify-center cursor-pointer bg-[#201f24] hover:bg-opacity-[0.7] rounded-md">
            <button className="font-bold text-white border-none">
              Create Account
            </button>
          </div>
        </form>
        <p className="text-[#8180b6] text-sm text-center">
          Already have an account ?{" "}
          <Link
            href="/auth/login"
            className="text-[#201f64] underline font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
