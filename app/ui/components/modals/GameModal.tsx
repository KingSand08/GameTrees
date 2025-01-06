"use client";
import React, { useState } from "react";
import Game from "@/types/models/Game";
import Image from "next/image";

interface GameModalProps {
  games: Game[]; // Array of all games
  onClose: () => void; // Function to close the modal
  onSave: (selectedStoreIds: string[], type: string) => void; // Function to save the entered data
}

const ITEMS_PER_PAGE = 5;

const GameModal: React.FC<GameModalProps> = ({ games, onClose, onSave }) => {
  const [selectedGameIds, setSelectedGameIds] = useState<{ gameId: number }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);
  const currentStores = games.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
 
  const handleCheckboxChange = (gameId: number) => {
    setSelectedGameIds((prev) => {
      const exists = prev.some((game) => game.gameId === gameId);
      if (exists) {
        return prev.filter((game) => game.gameId !== gameId);
      } else {
        return [...prev, { gameId }];
      }
    });
  };

  const handleSave = () => {
    onSave(selectedGameIds.map((game) => game.gameId.toString()), "game");
    setSelectedGameIds([]);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <h2 className="text-lg font-bold mb-4 text-gray-600 text-center">Available or Unclaimed Stores</h2>
        
        {/* List of Unclaimed Stores */}
            <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-gray-500">Select</th>
                <th className="border px-4 py-2 text-gray-500">Cover</th>
                <th className="border px-4 py-2 text-gray-500">Title</th>
                <th className="border px-4 py-2 text-gray-500">Developer</th>
                <th className="border px-4 py-2 text-gray-500">Description</th>
              </tr>
            </thead>
            <tbody>
              {currentStores.map((game, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedGameIds.some((selected) => selected.gameId === game.gid)}
                      onChange={() => handleCheckboxChange(game.gid)}
                    />
                  </td>
                  {/* show images */}
                  <td className="border px-4 py-2 text-gray-600">
                    {game.image ? (
                                <Image
                                    src={game.image}
                                    alt={`${game.title} cover`}
                                    className="w-24 h-24 object-contain"
                                    width={1000}
                                    height={1000}
                                    quality={100}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-gray-400">No Image</span>
                                </div>
                            )}    
                  </td>
                  <td className="border px-4 py-2 text-gray-600">{game.title}</td>
                  <td className="border px-4 py-2 text-gray-600">{game.developer}</td>
                  <td className="border px-4 py-2 text-gray-600">{game.description}</td>
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
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Add Games to Selected Stores
          </button>
        </div>
      </div>      
    </div>
  );
};

export default GameModal;
