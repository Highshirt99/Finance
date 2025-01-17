import React from "react";

const ConfirmDelete = ({ setShowDeleteModal, deleteItem, selectedItem,  items}) => {

  const item = items.find(item => item.id === selectedItem.id)
  return (
    <div className="backdrop-blur-sm overflow-scroll  shadow-md flex gap-3 justify-center items-center fixed inset-0 z-[50] max-md:mx-2 bg-black bg-opacity-10 scrollbar-hide">
      <div className="bg-white p-4 rounded-lg flex flex-col gap-4 max-md:mx-6 lg:w-[350px]">
          <p className="font-bold">Delete {selectedItem.name || selectedItem.category}?</p>
          <span className="text-[#aab3c0] text-[10px] font-semibold">
            Are you sure you want to delete this {selectedItem.name || selectedItem.category }? This action cannot be
            reversed, and all the data inside it will be   forever.
          </span>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="w-full p-3 text-center font-bold hover:bg-opacity-30 bg-[#f8f4f0] rounded-lg"
          >
            No, Go Back
          </button>
          <button
            onClick={() => {
              deleteItem(selectedItem.id);
            }}
            className="w-full text-white p-3 text-center rounded-lg font-bold bg-[#c94736]  hover:bg-opacity-30"
          >
            Yes, Delete
          </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
