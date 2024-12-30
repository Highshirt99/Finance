"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/Provider ";
import DataTable from "@/components/DataTable ";
import { useDataTable } from "@/lib/data/useDataTable ";
import { FaUser } from "react-icons/fa";
import AddTransaction from "@/components/modals/AddTransaction ";

const Transactions = () => {
  const { transactionsData, setTransactionsData } = useContext(AppContext);

  const [filteredCategory, setFilteredCategory] = useState(transactionsData);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  useEffect(() => {
    setFilteredCategory(transactionsData);
  }, [transactionsData]);

  const filterByCategory = (category) => {
    if (category === "All Transactions") {
      setFilteredCategory(transactionsData);
    } else {
      const filtered = transactionsData?.filter(
        (item) => item.category === category
      );

      setFilteredCategory(filtered);
    }
  };

  const handleSearch = (keyword) => {
    const filtered = transactionsData?.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    setFilteredCategory(filtered);
  };
  const handleSort = (sortType) => {
    if (sortType === "A to Z") {
      setFilteredCategory(
        [...filteredCategory].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (sortType === "Z to A") {
      setFilteredCategory(
        [...filteredCategory].sort((a, b) => b.name.localeCompare(a.name))
      );
    } else if (sortType === "Highest") {
      setFilteredCategory(
        [...filteredCategory].sort((a, b) => b.amount - a.amount)
      );
    } else if (sortType === "Lowest") {
      setFilteredCategory(
        [...filteredCategory].sort((a, b) => a.amount - b.amount)
      );
    }
  };
  const {
    currentPage,
    searchKeyword,
    data: postsData,
    isLoading,
    isFetching,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllPosts(searchKeyword, currentPage),
    dataQueryKey: "posts",
    deleteDataMessage: "Post is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({
        slug,
        token,
      });
    },
  });

  return (
    <div className="lg:relative  left-[17%]  lg:w-3/4 lg:px-0 px-6 py-6 lg:py-12">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          className="bg-[#201f24] text-[10px] text-white p-3 font-bold rounded-md"
          onClick={() => setTransactionModalOpen(true)}
        >
          + Add New Transaction
        </button>
      </div>
      <DataTable
        searchInputPlaceHolder="Search Transaction..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        handleFilter={filterByCategory}
        handleSearch={handleSearch}
        transactionsData={transactionsData}
        handleSort={handleSort}
        tableHeaderTitleList={[
          "Recipient/Sender",
          "Category",
          "Transaction Date",
          "Amount",
        ]}
        isLoading={isLoading}
        isFetching={isFetching}
        data={transactionsData}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={transactionsData?.headers}
      >
        {filteredCategory.map((transaction) => (
          <tr key={transaction.id}>
            <td className="px-5 bg-white border-b border-gray-200 py-5text-sm">
              <div className="flex items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-[#277c77] text-white text-[10px] flex justify-center items-center w-8 h-8 rounded-[50%] p-1">
                    <FaUser />
                  </div>
                  <p className="font-bold text-gray-900 whitespace-no-wrap">
                    {transaction.name}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-b-gray-200">
              <p className="text-gray-500 whitespace-no-wrap">
                {transaction.category}
              </p>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p className="ml-1 text-gray-500 whitespace-no-wrap">
                {new Date(transaction.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p className={`${transaction.amount < 0 ? "text-black" : "text-[#277c77]" } whitespace-no-wrap`}>
                <span>{transaction.amount < 0 ? "-" : "+"}</span>$
                {transaction.amount < 0 ? transaction.amount.slice(1) : transaction.amount}
              </p>
            </td>
          </tr>
        ))}
      </DataTable>

      {transactionModalOpen && (
        <AddTransaction
          setTransactionModalOpen={setTransactionModalOpen}
          transactionsData={transactionsData}
          setTransactionsData={setTransactionsData}
        />
      )}
    </div>
  );
};

export default Transactions;
