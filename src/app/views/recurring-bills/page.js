"use client";
import { useContext, useState } from "react";
import { AppContext } from "@/components/Provider ";
import { BsReceiptCutoff } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import DataTable from "@/components/DataTable ";
import { useDataTable } from "@/lib/data/useDataTable ";


const RecurringBills = () => {
  const {transactionsData, setTransactionsData} = useContext(AppContext)
  
  // console.log(transactionsData)

  const recurringTransactions = transactionsData?.filter(
    (item) => item.recurring
  );
  const [filteredCategory, setFilteredCategory] = useState(
    recurringTransactions
  );

  const handleSearch = (keyword) => {
    const filtered = recurringTransactions?.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    setFilteredCategory(filtered)
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

  const total = recurringTransactions.reduce((acc, curr) => {
   return acc + Number(curr.amount)
  }, 0);

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
    <div className="lg:relative  left-[17%]  lg:w-3/4 lg:px-0 px-6 py-6 lg:py-12 ">
      <h1 className="text-3xl font-bold">Recurring Bills</h1>
      <div className="flex gap-5 max-md:flex-col mt-6">
        <div className="flex flex-col gap-5 lg:w-[25%] w-full">
          <div className="bg-[#201f24] rounded-[10px] p-8 h-fit flex max-md:items-center lg:justify-start gap-8 lg:flex-col ">
            <BsReceiptCutoff className="text-white text-[28px]" />
            <div className="font-bold text-white">
              <p>Total bills</p>
              <h1 className="text-[26px]">${total.toFixed(2)}</h1>
            </div>
          </div>

          <div className="bg-white rounded-[10px] p-8 h-fit ">
            <p className="mb-2">Summary</p>
            <div className="py-3 flex justify-between border-b">
              <span className="text-[#8c9095] text-[10px]">Paid Bills</span>
              <span className="text-[#8f959a] text-[10px] font-bold">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="py-3 flex justify-between border-b">
              <span className="text-[#8c9095] text-[10px]">Total Upcoming</span>
              <span className="text-[#8f959a] text-[10px] font-bold">
              ${total.toFixed(2)}
              </span>
            </div>
            <div className="py-3 flex justify-between border-b">
              <span className="text-[#8c9095] text-[10px]">Due Soon</span>
              <span className="text-[#dd999b] text-[10px] font-bold">
                $0.00
              </span>
            </div>
          </div>
        </div>
        <div className="lg:w-[75%] p-8 h-fit w-full bg-white rounded-[10px]">
          <DataTable
            searchInputPlaceHolder="Search Bill..."
            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
            searchKeywordOnChangeHandler={searchKeywordHandler}
            searchKeyword={searchKeyword}
            handleSearch={handleSearch}
            transactionsData={transactionsData}
            handleSort={handleSort}
            tableHeaderTitleList={["Bill Title", "Due Date", "Amount"]}
            isLoading={isLoading}
            isFetching={isFetching}
            data={transactionsData}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            headers={transactionsData?.headers}
            recurring
          >
            {filteredCategory?.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-5 bg-white border-b border-gray-200 py-5text-sm">
                  <div className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#277c77] text-[10px] text-white flex justify-center items-center w-8 h-8 rounded-[50%] p-1">
                        <FaUser className="self-center mb-[1px] ml-[0.35px]" />
                      </div>
                      <p className="font-bold text-gray-900 whitespace-no-wrap">
                        {transaction.name}
                      </p>
                    </div>
                  </div>
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
                  <p className="text-[#277c77] whitespace-no-wrap">
                    ${transaction.amount}
                  </p>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default RecurringBills;
