"use client";
import React, { useState } from "react";

interface DiscountEditModalProps {
  onClose: () => void; // Function to close the modal
  onSave: (discount: number) => void; // Function to save the entered data
}

const DiscountEditModal: React.FC<DiscountEditModalProps> = ({ onClose, onSave }) => {
  const [discount, setDiscount] = useState<number | null>(null);

  const handleSave = () => {
    if (discount === null || discount < 0 || discount > 100) {
      alert("Please enter a valid discount between 0 and 100%");
      return;
    }
    onSave(discount);
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Set Discount</h2>
        <p className="text-gray-600 mb-4">Enter the discount percentage for the selected games:</p>
        <input
          type="number"
          value={discount !== null ? discount : ""} // Show 0 correctly, treat null as empty
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder="Enter discount (%)"
          className="w-full border rounded px-2 py-1 mb-4 text-gray-900"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountEditModal;
