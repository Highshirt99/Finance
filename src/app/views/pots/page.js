"use client";
import { useState } from "react";
import ConfirmDelete from "@/components/modals/ConfirmDelete ";
import { BsThreeDots } from "react-icons/bs";
import AddPot from "@/components/modals/AddPot ";
import EditPot from "@/components/modals/EditPot ";
import AddMoney from "@/components/modals/AddMoney ";
import Withdraw from "@/components/modals/Withdraw ";
import { useDispatch, useSelector } from "react-redux";
import { deletePot } from "@/lib/redux/slice ";

const Pots = () => {
  const [potModalOpen, setPotModalOpen] = useState(false);
  const [EditPotModalOpen, setEditPotModalOpen] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedPot, setSelectedPot] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addMoneyModalOpen, setAddMoneyModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const pots = useSelector((state) => state.finance.user.pots);

  const dispatch = useDispatch();

  const handleShowMenu = (pot) => {
    setSelectedPot(pot);
    setShowMenu(!showMenu);
  };

  const handleEditPotModalOpen = (id) => {
    setEditPotModalOpen(id);
  };

  const handleDeletePot = (id) => {
    dispatch(deletePot(id));
    setShowDeleteModal(false);
  };


  return (
    <div className="lg:relative  left-[17%]  lg:w-3/4 lg:px-0 px-6 py-6 lg:py-12 ">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-3xl font-bold">Pots</h1>
        <button
          className="bg-[#201f24] text-[10px] text-white p-3 font-bold rounded-md"
          onClick={() => setPotModalOpen(true)}
        >
          + Add New Pot
        </button>
      </div>
      {pots?.length > 0 ? (
        <div className="flex gap-8 max-md:flex-col my-12  ">
          <div className="flex max-md:flex-col gap-4 w-full ">
            {pots.map((pot) => (
              <div
                key={pot.id}
                className="bg-white rounded-lg p-4 flex flex-col gap-4 relative lg:w-[350px] h-fit"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#934f6f]" />
                    <p className=" font-bold">{pot.name}</p>
                  </div>
                  <BsThreeDots
                    onClick={() => {
                      handleShowMenu(pot);
                    }}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full ">
                      <span className="text-[#a3a0a9] text-[9px]">
                        Total Saved
                      </span>
                      <p className="font-bold ml-3 mt-1 text-[20px]">
                        ${pot.saved.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-full rounded-full h-[5px] my-4 bg-[#f8f4f0] relative">
                      <div
                        className="absolute bg-green-600 h-[5px] rounded-full"
                        style={{
                          width:
                            ((pot.saved / pot.target) * 100).toFixed(2) + "%",
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-[#9d9a9b] flex justify-between my-4">
                      <span>
                        {((pot.saved / pot.target) * 100).toFixed(2)}%
                      </span>
                      <span>Target of ${Number(pot.target).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 w-full font-bold mb-4 ">
                  <button
                    className="bg-[#9d9a9b] w-1/2 hover:bg-[#f8f4f0]  p-3 rounded-md cursor-pointer"
                    onClick={() => {
                      setAddMoneyModalOpen(true);
                    }}
                  >
                    + Add Money
                  </button>
                  <button
                    className="bg-[#9d9a9b] hover:bg-[#f8f4f0] w-1/2  p-3 rounded-md cursor-pointer"
                    onClick={() => {
                      setWithdrawModalOpen(true);
                    }}
                  >
                    Withdraw
                  </button>
                </div>

                {addMoneyModalOpen && (
                  <AddMoney
                    setAddMoneyModalOpen={setAddMoneyModalOpen}
                    pots={pots}
                    pot={pot}
                  />
                )}
                {withdrawModalOpen && (
                  <Withdraw
                    setWithdrawModalOpen={setWithdrawModalOpen}
                    pots={pots}
                    pot={pot}
                  />
                )}
                <div
                  className={`${
                    selectedPot?.id === pot.id && showMenu ? "flex " : "hidden"
                  } shadow-md border w-[100px] text-[10px] absolute right-1 top-12 gap-3 hover p-4 rounded-md flex-col bg-white`}
                >
                  <button
                    className="cursor-pointer border-b pb-2  font-bold"
                    onClick={() => {
                      handleEditPotModalOpen(pot.id);
                    }}
                  >
                    Edit Pot
                  </button>
                  <button
                    className="cursor-pointer text-red-500  font-bold"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Pot
                  </button>
                </div>
                {EditPotModalOpen === pot.id && (
                  <EditPot
                    pots={pots}
                    setShowMenu={setShowMenu}
                    setEditPotModalOpen={setEditPotModalOpen}
                    pot={pot}
                  />
                )}
                {showDeleteModal && (
                  <ConfirmDelete
                    setShowDeleteModal={setShowDeleteModal}
                    deleteItem={handleDeletePot}
                    items={pots}
                    selectedItem = {selectedPot}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-4">
          You do not have any pot yet, create a new one.
        </p>
      )}

      {potModalOpen && <AddPot pots={pots} setPotModalOpen={setPotModalOpen} />}
    </div>
  );
};

export default Pots;
