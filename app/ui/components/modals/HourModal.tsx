"use client";
import React, { useState } from "react";

interface HoursData {
  day: string;
  open: string; 
  close: string;
}

interface HourModalProps {
  onClose: () => void; // Function to close the modal
  onSave: (hourData: HoursData) => void; // Function to save the entered data
}

const HourModal: React.FC<HourModalProps> = ({ onClose, onSave }) => {
  const [hoursData, setHoursData] = useState<HoursData>({ day: "", open: "", close: "" });

  const timeFormatRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;

  const handleInputChange = (field: keyof HoursData, value: string) => {
    setHoursData((prev) => ({ ...prev, [field]: value }));
  };

  const allFieldsFilled = Object.values(hoursData).every((value) => value.trim() !== "") &&
    timeFormatRegex.test(hoursData.open) &&
    timeFormatRegex.test(hoursData.close);

  const handleSave = () => {
    onSave(hoursData);
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Edit Operating Hours</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Day</label>
            <select
              value={hoursData.day}
              onChange={(e) => handleInputChange("day", e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="" disabled>Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Open</label>
            <input
              type="text"
              value={hoursData.open}
              onChange={(e) => handleInputChange("open", e.target.value)}
              className={`w-full border rounded px-2 py-1 ${timeFormatRegex.test(hoursData.open) ? "border-gray-300" : "border-red-500"}`}
              placeholder="e.g. 09:00 AM"
            />
            {!timeFormatRegex.test(hoursData.open) && hoursData.open.trim() !== "" && (
              <p className="text-red-500 text-sm">Invalid time format. Use e.g. 09:00 AM</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Close</label>
            <input
              type="text"
              value={hoursData.close}
              onChange={(e) => handleInputChange("close", e.target.value)}
              className={`w-full border rounded px-2 py-1 ${timeFormatRegex.test(hoursData.close) ? "border-gray-300" : "border-red-500"}`}
              placeholder="e.g. 05:00 PM"
            />
            {!timeFormatRegex.test(hoursData.close) && hoursData.close.trim() !== "" && (
              <p className="text-red-500 text-sm">Invalid time format. Use e.g. 05:00 PM</p>
            )}
          </div>
        </form>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
          >
            Close
          </button>
          {allFieldsFilled && (
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HourModal;
