"use client";
import { useContext, useState } from "react";
import { AppContext } from "@/components/Provider ";
import { Chart } from "@/components/Chart ";
import AddBudget from "@/components/modals/AddBudget ";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import EditBudget from "@/components/modals/EditBudget ";
import ConfirmDelete from "@/components/modals/ConfirmDelete ";


export  const allBudgets = [
  {
    category: "Transportation",
    max: 600,
    spent: 0.0,
    id: 1,
  },
  {
    category: "PersonalCare",
    max: 1600,
    spent: 0.0,
    id: 2,
  },
  {
    category: "Shopping",
    max: 1500,
    spent: 0.0,
    id: 3,
  },
];

const Budgets = () => {
 

  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [EditBudgetModalOpen, setEditBudgetModalOpen] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    budgets, setBudgets
  } = useContext(AppContext)

  const handleShowMenu = (id) => {
    setSelectedCategory(id);
    setShowMenu(!showMenu);
  };

  const handleEditBudgetModalOpen = (id) => {
    setEditBudgetModalOpen(id);
  };

  const deleteBudget = (id) => {
    const filtered = budgets.filter((item) => item.id !== id);
    setBudgets(filtered);
    setShowDeleteModal(false);
  };

  return (
    <div className="lg:relative  left-[17%]  lg:w-3/4 lg:px-0 px-6 py-6 lg:py-12 my-8">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-semibold">Budgets</h1>
        <button
          className="bg-[#201f24] text-[10px] text-white p-3 font-bold rounded-md"
          onClick={() => setBudgetModalOpen(true)}
        >
          + Add New Budget
        </button>
      </div>
      <div className="flex gap-8 max-md:flex-col my-12  ">
        <div className="flex flex-col bg-[#fff] max-md:w-full h-fit justify-center w-[30%] rounded-md p-6  ">
          <Chart />
          <h4 className="font-bold text-[16px]">Spending Summary</h4>
          <div className="mt-3">
            {budgets.map((budget) => (
              <div
                className="flex items-center justify-between mb-2 border-b border-b-gray-300 pb-3"
                key={budget.id}
              >
                <div className="flex items-center gap-3">
                  <div className=" bg-[#f2cdac] w-1 h-[18px]" />
                  <p className="text-[#9da4aa]  text-[9px] ">
                    {budget.category}
                  </p>
                </div>
                <div className="text-[12px]">
                  <p className="text-[#201f24] font-bold  ">
                    ${budget.spent}
                    <span className="text-[#9da4aa] font-normal ml-1 ">
                      of ${budget.max}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full ">
          {budgets.map((budget) => (
            <div
              key={budget.id}
              className="bg-white rounded-lg p-4 flex flex-col gap-4 relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#934f6f]" />
                  <p className=" font-bold">{budget.category}</p>
                </div>
                <BsThreeDots
                  onClick={() => {
                    handleShowMenu(budget.id);
                  }}
                  className="cursor-pointer"
                />
              </div>

              <span className="text-[#a3a0a9] text-[9px]">
                Maximum spend of ${budget.max}.00
              </span>
              <div className="w-full rounded-sm h-7 bg-[#f8f4f0]" />
              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex items-center gap-3 ">
                    <div className="w-1 h-[18px] bg-[#934f6f]" />
                    <span className="text-[#a3a0a9] text-[9px]">Spent</span>
                  </div>
                  <p className="font-bold ml-3 mt-1 text-[11px]">
                    ${budget.spent}.00
                  </p>
                </div>
                <div className="w-1/2">
                  <div className="flex items-center gap-3 ">
                    <div className="w-1 h-[18px] bg-[#f8f4f0]" />
                    <span className="text-[#a3a0a9] text-[9px]">Free</span>
                  </div>
                  <p className="font-bold ml-3 mt-1 text-[11px]">
                    ${budget.max - budget.spent}.00
                  </p>
                </div>
              </div>

              <div className="bg-[#f8f4f0] p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="font-bold">Latest Spending</p>
                  <div className="flex items-center gap-1 text-[11px]">
                    <p className="text-[#696868]">See All</p>
                    <Link href="/views/transactions">
                      <MdArrowRight className="text-[#696868] text-[22px] " />
                    </Link>
                  </div>
                </div>
                <p className="mt-3 text-center text-sm text-[#696868]">
                  You haven&apos;t made any spendings yet.
                </p>
              </div>
              <div
                className={`${
                  selectedCategory === budget.id && showMenu
                    ? "flex "
                    : "hidden"
                } shadow-md border w-[100px] text-[10px] absolute right-1 top-12 gap-3 hover p-4 rounded-md flex-col bg-white`}
              >
                <button
                  className="cursor-pointer border-b pb-2"
                  onClick={() => {
                    handleEditBudgetModalOpen(budget.id);
                  }}
                >
                  Edit Budget
                </button>
                <button
                  className="cursor-pointer text-red-500"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Budget
                </button>
              </div>
              {EditBudgetModalOpen === budget.id && (
                <EditBudget
                  budgets={budgets}
                  setShowMenu={setShowMenu}
                  setEditBudgetModalOpen={setEditBudgetModalOpen}
                  budget={budget}
                />
              )}
              {showDeleteModal && (
                <ConfirmDelete

                  setShowDeleteModal={setShowDeleteModal}
                  deleteBudget={deleteBudget}
                  budget={budget}
                  
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {budgetModalOpen && (
        <AddBudget budgets={budgets}
         setBudgetModalOpen={setBudgetModalOpen} />
      )}
    </div>
  );
};

export default Budgets;
