"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { AppContext } from "@/components/Provider ";
import CurrentBalance from "@/components/CurrentBalance ";
import Income from "@/components/Income ";
import Expenses from "@/components/Expenses ";
import Pots from "@/components/Pots ";
import Transactions from "@/components/Transactions ";
import Budgets from "@/components/Budgets ";
import RecurringBills from "@/components/RecurringBills ";

export default function Home() {
  const router = useRouter();

  // const { token } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("account")
    if (!token) {
      router.push("/auth/login", { scroll: false });
    }
    router.push("/", { scroll: false });
  }, [router]);

  const logout = () => {
    localStorage.removeItem("account");
    router.push("/auth/login", { scroll: false });
  };

  return (
    <div className="lg:relative mb-12 lg:mb-8  left-[17%] lg:w-3/4 ">
      <div className="flex items-center justify-between p-6 ">
        <h1 className="font-bold text-[20px] text-[#322924] ">Overview</h1>
        <button
          className="bg-[#201f24] flex gap-2 p-3 w-[90px] justify-center text-white items-center rounded-md"
          onClick={logout}
        >
          <MdLogout />
          <span> Logout</span>
        </button>
      </div>

      <div className="grid gap-4 px-6 lg:grid-cols-3">
        <CurrentBalance />
        <Income />
        <Expenses />
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 mt-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Pots />
          <Transactions />
         
        </div>
        <div className="flex flex-col gap-4">
        <Budgets />
        <RecurringBills />
        </div>
      </div>
    </div>
  );
}
