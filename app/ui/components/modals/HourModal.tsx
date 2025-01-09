"use client";
import StoreHours from "@/types/models/StoreHours";
import React, { useState } from "react";

interface HourModalProps {
  storeHours: StoreHours[]; // Array of existing store hours
  onClose: () => void; // Function to close the modal
  onSave: (hourData: StoreHours) => void; // Function to save the entered data
  onDelete: (day: string[]) => void; // Function to delete hours
}

const HourModal: React.FC<HourModalProps> = ({ storeHours, onClose, onSave , onDelete }) => {
  const [hoursData, setHoursData] = useState<StoreHours>({ day: "", start_time: "", end_time: "" });
  const [selectedHours, setSelectedHours] = useState<{ day: string }[]>([]);

  const timeFormatRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;

  const handleInputChange = (field: keyof StoreHours, value: string) => {
    setHoursData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (day: string) => {
    setSelectedHours((prev) => {
      const exists = prev.some((hour) => hour.day === day);
      if (exists) {
        return prev.filter((hour) => hour.day !== day);
      } else {
        return [...prev, { day }];
      }
    });
  };

  const allFieldsFilled =
    Object.values(hoursData).every((value) => value.trim() !== "") &&
    timeFormatRegex.test(hoursData.start_time) &&
    timeFormatRegex.test(hoursData.end_time);

  const handleSave = () => {
    onSave(hoursData);
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Edit Operating Hours</h2>
        
        {/* List of Store Hours */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold mb-2">Existing Store Hours</h3>
            <button
              onClick={() => onDelete(selectedHours.map((hour) => hour.day))}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Delete
            </button>
          </div>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Select</th>
                <th className="border px-4 py-2">Day</th>
                <th className="border px-4 py-2">Open</th>
                <th className="border px-4 py-2">Close</th>
              </tr>
            </thead>
            <tbody>
              {storeHours.map((hour, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedHours.some((selected) => selected.day === hour.day)}
                      onChange={() => handleCheckboxChange(hour.day)}
                    />
                  </td>
                  <td className="border px-4 py-2">{hour.day}</td>
                  <td className="border px-4 py-2">{hour.start_time}</td>
                  <td className="border px-4 py-2">{hour.end_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form to Edit or Add New Hours */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Day</label>
            <select
              value={hoursData.day}
              onChange={(e) => handleInputChange("day", e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="" disabled>
                Select a day
              </option>
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
              value={hoursData.start_time}
              onChange={(e) => handleInputChange("start_time", e.target.value)}
              className={`w-full border rounded px-2 py-1 ${
                timeFormatRegex.test(hoursData.start_time) ? "border-gray-300" : "border-red-500"
              }`}
              placeholder="e.g. 09:00 AM"
            />
            {!timeFormatRegex.test(hoursData.start_time) && hoursData.start_time.trim() !== "" && (
              <p className="text-red-500 text-sm">Invalid time format. Use e.g. 09:00 AM</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Close</label>
            <input
              type="text"
              value={hoursData.end_time}
              onChange={(e) => handleInputChange("end_time", e.target.value)}
              className={`w-full border rounded px-2 py-1 ${
                timeFormatRegex.test(hoursData.end_time) ? "border-gray-300" : "border-red-500"
              }`}
              placeholder="e.g. 05:00 PM"
            />
            {!timeFormatRegex.test(hoursData.end_time) && hoursData.end_time.trim() !== "" && (
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
