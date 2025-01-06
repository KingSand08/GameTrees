"use client";
import React, { useState } from "react";
import Business from "@/types/models/Business";

interface NewStoreModalProps {
  businesses: Business[]; // Array of all games
  onClose: () => void; // Function to close the modal
  onSave: (businessId: string[], type: string) => void; // Function to save the entered data
}

const CreateStoreModal: React.FC<NewStoreModalProps> = ({
  businesses,
  onClose,
  onSave,
}) => {
  const [storeName, setStoreName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [editedModality, setEditedModality] = useState("");
  const [parentCompanyId, setParentCompanyId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    if (!storeName || !street || !parentCompanyId) {
      setError("Store Name, Parent Company, and Street are required.");
      return;
    }
    setError(""); // Clear error message if validation passes
    onSave([storeName, street, city, state, zip, country, editedModality, String(parentCompanyId)], "create");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg text-gray-700">
        <h2 className="text-2xl font-bold mb-4">Create New Store</h2>
        <form className="space-y-4">
          {/* Store Name */}
          <div>
            <label htmlFor="storeName" className="block text-sm font-medium">
              Store Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
              placeholder="Enter store name"
            />
          </div>

          {/* Street */}
          <div>
            <label htmlFor="street" className="block text-sm font-medium">
              Street <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
              placeholder="Enter street"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
              placeholder="Enter city"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium">
              State
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
              placeholder="Enter state"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label htmlFor="zip" className="block text-sm font-medium">
              Zip Code
            </label>
            <input
              type="text"
              id="zip"
              value={zip ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) { // Allow only digits
                  setZip(value);
                }
              }}              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
              placeholder="Enter zip code"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
              placeholder="Enter country"
            />
          </div>

          {/* Modality */}
          <div>
            <label htmlFor="modality" className="block text-sm font-medium">
              Modality
            </label>
            <select
              id="modality"
              value={editedModality}
              onChange={(e) => setEditedModality(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            >
              <option value="" disabled>
                Select a modality
              </option>
              <option value="Digital">Digital (Online)</option>
              <option value="Physical">Physical (In-Store)</option>
              <option value="Digital & Physical">Digital & Physical (Hybrid)</option>
            </select>
          </div>

          {/* Parent Company */}
          <div>
            <label htmlFor="parentCompany" className="block text-sm font-medium">
              Parent Company <span className="text-red-500">*</span>
            </label>
            <select
              id="parentCompany"
              value={parentCompanyId ?? ""}
              onChange={(e) => setParentCompanyId(Number(e.target.value))}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select a parent company</option>
              {businesses.map((business) => (
                <option key={business.bid} value={business.bid}>
                  {business.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Modal Actions */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreModal;
