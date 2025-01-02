"use client";

import Business from "@/types/models/Business";
import React, { useState, useEffect } from "react";

export default function CreateGamePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [publishDate, setPublishDate] = useState("");
  const [devId, setDevId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [developers, setDevelopers] = useState<Business[]>([]);

  // Fetch developers on mount
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch("/api/business/getDevelopers");
        const data = await response.json();

        if (response.ok) {
          setDevelopers(data);
        } else {
          console.error("Failed to fetch developers:", data.error);
        }
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!title || !description || price === "" || !devId || !publishDate || !image) {
      setMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("publishDate", publishDate);
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
        setDescription("");
        setPrice("");
        setPublishDate("");
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
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Price</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 pl-8 bg-gray-800 rounded border border-gray-700"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="publishDate" className="block mb-1 font-medium">Publish Date</label>
          <input
            type="date"
            id="publishDate"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="devId" className="block mb-1 font-medium">Developer</label>
          <select
            id="devId"
            value={devId}
            onChange={(e) => setDevId(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          >
            <option value="">-- Select a Developer --</option>
            {developers.map((dev) => (
              <option key={dev.bid} value={dev.bid}>
                {dev.name}
              </option>
            ))}
          </select>
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
