"use client";

import React, { useState } from "react";

export default function CreateGamePage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [devId, setDevId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || price === "" || !devId || !image) {
      setMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price.toString());
    formData.append("devId", devId);
    formData.append("image", image);

    try {
      const response = await fetch("/api/admin/add-game", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Game added successfully!");
        setTitle("");
        setPrice("");
        setDevId("");
        setImage(null);
      } else {
        setMessage(data.error || "Failed to add game.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
      setMessage("An error occurred while adding the game.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Add a New Game</h1>
      {message && (
        <div className={`mb-4 p-4 rounded ${message.includes("success") ? "bg-green-500" : "bg-red-500"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Game Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="devId" className="block mb-1 font-medium">Developer ID</label>
          <input
            type="text"
            id="devId"
            value={devId}
            onChange={(e) => setDevId(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1 font-medium">Game Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold"
        >
          Add Game
        </button>
      </form>
    </div>
  );
}
