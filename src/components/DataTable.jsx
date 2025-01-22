"use client";

import { useContext, useEffect, useState } from "react";
import { FaAngleDown, FaFilter } from "react-icons/fa";
import { RiSortDesc } from "react-icons/ri";
import Pagination from "./Pagination";
import { AppContext } from "./Provider";

const DataTable = ({
  searchInputPlaceHolder,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  children,
  setCurrentPage,
  currentPage,
  handleFilter,
  handleSearch,
  handleSort,
  headers,
  recurring
}) => {
  const [sortType, setSortType] = useState("Latest");
  const [showSortList, setShowSortList] = useState(false);
  const [showFilterList, setShowFilterList] = useState(false);
  const [category, setCategory] = useState("All Transactions");
  const [keyword, setKeyword] = useState("");

  const sortList = [
    {
      name: "Latest",
      id: 1,
    },
    {
      name: "Oldest",
      id: 2,
    },
    {
      name: "A to Z",
      id: 3,
    },
    {
      name: "Z to A",
      id: 4,
    },
    {
      name: "Highest",
      id: 5,
    },
    {
      name: "Lowest",
      id: 6,
    },
  ];

  const categories = [
    {
      name: "All Transactions",
      id: 1,
    },
    {
      name: "Entertainment",
      id: 2,
    },
    {
      name: "Bills",
      id: 3,
    },
    {
      name: "Groceries",
      id: 4,
    },
    {
      name: "Dining Out",
      id: 5,
    },
    {
      name: "Transportation",
      id: 6,
    },
  ];

  return (
    <div>
      <div className="relative w-full px-4 mx-auto">
        <div className="py-8">
          <div className="p-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg">
              <div className="flex flex-row justify-between w-full ">
                <div className="w-full p-4 bg-white ">
                  <form
                   
                    className="flex items-center space-x-8 lg:justify-between "
                  >
                    <div className="relative ">
                      <input
                        type="text"
                        id="form-search-filter"
                        className=" rounded-lg   border lg:w-[250px] border-gray-400 px-2 py-[0.28rem] bg-white text-gray-700 placeholder-gray-400  text-base focus:outline-none focus:ring-2 focus:ring-[#277c77] focus:border-transparent"
                        placeholder={searchInputPlaceHolder}
                        value={keyword}
                        onChange={(e) => {
                          setKeyword(e.target.value);
                          handleSearch(e.target.value);
                        }}
                      />
                    </div>

                    <div className="items-center gap-2 lg:flex">
                      <RiSortDesc
                        onClick={() => {
                          setShowSortList(!showSortList);
                        }}
                        className="block cursor-pointer lg:hidden"
                      />
                      <p className="text-[9px] text-gray-500 hidden lg:block">
                        Sort by
                      </p>
                      <div
                        onClick={() => setShowSortList(!showSortList)}
                        className="border text-[9px] items-center p-2 rounded-md text-gray-500 hidden w-[120px] lg:flex justify-between cursor-pointer"
                      >
                        <p className = "text-black">{sortType}</p>
                        <FaAngleDown className="text-[16px]" />
                      </div>
                      <div
                        className={`${
                          showSortList ? "block" : "hidden"
                        } bg-white p-3 rounded-md absolute right-40 top-4 lg:right-80 text-gray-500  shadow-md border flex flex-col gap-1 w-[150px]`}
                      >
                        {sortList.map((item) => (
                          <p
                            key={item.id}
                            onClick={() => {
                              setSortType(item.name);
                              handleSort(item.name);
                              setShowSortList(false);
                            }}
                            className="px-2 pb-2 border-b rounded-sm cursor-pointer hover:bg-gray-600 hover:text-white "
                          >
                            {item.name}
                          </p>
                        ))}
                      </div>
                    </div>

                    { !recurring && <div className="items-center gap-2 lg:flex ">
                     <FaFilter
                        onClick={() => {
                          setShowFilterList(!showFilterList);
                        }}
                        className="block cursor-pointer lg:hidden"
                      />
                      <p className="text-[9px] text-gray-500 hidden lg:block">
                        Filter by category
                      </p>
                      <div
                        onClick={() => setShowFilterList(!showFilterList)}
                        className="border text-[9px] items-center p-2 rounded-md text-gray-500 hidden w-[120px] lg:flex justify-between cursor-pointer"
                      >
                        <p className = "text-black">{category}</p>
                        <FaAngleDown className="text-[16px]" />
                      </div>    
                      <div
                        className={`${
                          showFilterList ? "block" : "hidden"
                        } bg-white p-3 rounded-md absolute  top-4 lg:right-20 text-gray-500  shadow-md border flex flex-col gap-1 w-[150px]`}
                      >
                        {categories.map((item) => (
                          <p
                            key={item.id}
                            onClick={() => {
                              handleFilter(item.name);
                              setCategory(item.name);
                              setShowFilterList(false);
                            }}
                            className="px-2 pb-2 border-b rounded-sm cursor-pointer hover:bg-gray-600 hover:text-white "
                          >
                            {item.name}
                          </p>
                        ))}
                      </div>
                    </div>
}
                  </form>
                </div>
              </div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-5 py-3 text-[9px] font-normal text-left text-gray-500 uppercase bg-white border-b border-gray-200"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    children
                  )}
                </tbody>
              </table>
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
