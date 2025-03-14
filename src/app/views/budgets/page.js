"use client";
import {  useState } from "react";
import { Chart } from "@/components/Chart ";
import AddBudget from "@/components/modals/AddBudget ";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import EditBudget from "@/components/modals/EditBudget ";
import ConfirmDelete from "@/components/modals/ConfirmDelete ";
import { getRandomColor } from "@/components/Chart ";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteBudget } from "@/lib/redux/slice ";


const Budgets = () => {
  const dispatch = useDispatch()
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [EditBudgetModalOpen, setEditBudgetModalOpen] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const  budgets  = useSelector(state => state.finance.user.budgets);
  const  transactionsData  = useSelector(state => state.finance.user.transactions);

  const getLatestTransactions = (budget) => {
    const transactions = transactionsData.filter(
      (item) => item.category === budget.category
    );
    return transactions;
  };

  const chartData =
    budgets?.length > 0
      ? budgets.map((item) => {
          return {
            category: item.category,
            budget: Number(item.max),
            fill: getRandomColor(),
          };
        })
      : [];

  const handleShowMenu = (budget) => {
    setSelectedCategory(budget);
    setShowMenu(!showMenu);
  };

  const handleEditBudgetModalOpen = (id) => {
    setEditBudgetModalOpen(id);
  };

  const handleDeleteBudget = (id) => {
    dispatch(deleteBudget(id))
    setShowDeleteModal(false);
  };

  return (
    <div className="lg:relative  left-[17%]  lg:w-3/4 lg:px-0 px-6 py-6 lg:py-12">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button
          className="bg-[#201f24] text-[10px] text-white p-3 font-bold rounded-md"
          onClick={() => setBudgetModalOpen(true)}
        >
          + Add New Budget
        </button>
      </div>
      {budgets?.length > 0 ? (
        <div className="flex gap-8 my-12 max-md:flex-col ">
          <div className="flex flex-col bg-[#fff] max-md:w-full h-fit justify-center w-[30%] rounded-md p-6  ">
            <Chart chartData={chartData} />
            <h4 className="font-bold text-[16px]">Spending Summary</h4>
            <div className="mt-3">
              {budgets?.map((budget) => (
                <div
                  className="flex items-center justify-between pb-3 mb-2 border-b border-b-gray-300"
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
          <div className="flex flex-col w-full gap-4 ">
            {budgets?.map((budget) => (
              <div
                key={budget.id}
                className="relative flex flex-col gap-4 p-4 bg-white rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#934f6f]" />
                    <p className="font-bold ">{budget.category}</p>
                  </div>
                  <BsThreeDots
                    onClick={() => {
                      handleShowMenu(budget);
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
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Latest Spending</p>
                    <div className="flex items-center gap-1 text-[11px]">
                      <p className="text-[#696868]">See All</p>
                      <Link href="/views/transactions">
                        <MdArrowRight className="text-[#696868] text-[22px] " />
                      </Link>
                    </div>
                  </div>
                  {getLatestTransactions(budget).length === 0 ? (
                    <p className="mt-3 text-center text-sm text-[#696868]">
                      You haven&apos;t made any spendings yet.
                    </p>
                  ) : (
                    getLatestTransactions(budget).map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between mt-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-red-600 text-white w-8 h-8 rounded-[50%] text-[10px] flex justify-center items-center">
                            <FaUser />
                          </div>
                          <p className="text-[10px] font-bold">
                            {transaction.name}
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`${
                              transaction.amount < 0
                                ? "text-[#d17561]"
                                : "text-[#5e9891]"
                            } flex items-center gap-1`}
                          >
                           <span>{transaction.amount < 0 ? "-" : "+"}</span>$
                           {transaction.amount < 0 ? (Number(transaction.amount.slice(1))).toFixed(2) : Number(transaction.amount).toFixed(2)}
                          </div>

                          <p className="text-[#696868] text-[10px]">
                            {" "}
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div
                  className={`${
                    selectedCategory?.id === budget.id && showMenu
                      ? "flex "
                      : "hidden"
                  } shadow-md border w-[100px] text-[10px] absolute right-1 top-12 gap-3 hover p-4 rounded-md flex-col bg-white`}
                >
                  <button
                    className="pb-2 font-bold border-b cursor-pointer"
                    onClick={() => {
                      handleEditBudgetModalOpen(budget.id);
                    }}
                  >
                    Edit Budget
                  </button>
                  <button
                    className="font-bold text-red-500 cursor-pointer"
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
                    deleteItem={handleDeleteBudget}
                    items={budgets}
                    selectedItem = {selectedCategory}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-center">
          You have not made any budget, create a new one.
        </p>
      )}

      {budgetModalOpen && (
        <AddBudget
          budgets={budgets}
          setBudgetModalOpen={setBudgetModalOpen}
       
        />
      )}
    </div>
  );
};

export default Budgets;
