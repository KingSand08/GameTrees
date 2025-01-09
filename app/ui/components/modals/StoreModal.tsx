"use client";
import StoreRow from "@/types/models/StoreRow";
import React, { useState } from "react";

interface StoreModalProps {
  stores: StoreRow[]; // Array of existing store hours
  onClose: () => void; // Function to close the modal
  onSave: (selectedStoreIds: string[], type: string) => void; // Function to save the entered data
}

const ITEMS_PER_PAGE = 6;

const StoreModal: React.FC<StoreModalProps> = ({ stores, onClose, onSave }) => {
  const [selectedStoreIds, setSelectedStoreIds] = useState<{ store_id: number }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stores.length / ITEMS_PER_PAGE);
  const currentStores = stores.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
 
  const handleCheckboxChange = (store_id: number) => {
    setSelectedStoreIds((prev) => {
      const exists = prev.some((store) => store.store_id === store_id);
      if (exists) {
        return prev.filter((store) => store.store_id !== store_id);
      } else {
        return [...prev, { store_id: store_id }];
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-lg font-bold mb-4 text-gray-600 text-center">Available or Unclaimed Stores</h2>
        
        {/* List of Unclaimed Stores */}
            <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-gray-500">Select</th>
                <th className="border px-4 py-2 text-gray-500">Name</th>
                <th className="border px-4 py-2 text-gray-500">Address</th>
                <th className="border px-4 py-2 text-gray-500">Modality</th>
              </tr>
            </thead>
            <tbody>
              {currentStores.map((store, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedStoreIds.some((selected) => selected.store_id === store.store_id)}
                      onChange={() => handleCheckboxChange(store.store_id)}
                    />
                  </td>
                  <td className="border px-4 py-2 text-gray-600">{store.store_name}</td>
                  <td className="border px-4 py-2 text-gray-600">{store.address}</td>
                  <td className="border px-4 py-2 text-gray-600">{store.modality}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-blue-800 font-bold italic">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        
        {/* Close button */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
          >
            Close
          </button>

          {/* Proceed button */}
          <button
              onClick={() => onSave(selectedStoreIds.map((store) => store.store_id.toString()), "store")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Claim Stores
          </button>
        </div>
      </div>      
    </div>
  );
};

export default StoreModal;
