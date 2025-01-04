"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageRow from "@/types/models/ImageRow";

interface ImageModalProps {
  images: ImageRow[]; // Array of image objects
  onClose: () => void; // Function to close the modal
  onRemove: (selectedImages: number[]) => void; // Function to handle selected images
}

const ImageModal: React.FC<ImageModalProps> = ({ images, onClose, onRemove }) => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const handleCheckboxChange = (photoId: number) => {
    setSelectedImages((prev) =>
      prev.includes(photoId)
        ? prev.filter((img) => img !== photoId)
        : [...prev, photoId]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Remove Store Images</h2>
        <ul className="space-y-2">
          {images.map((image, index) => (
            <li key={index} className="flex items-center space-x-4">
              <Image
                src={image.image || ""}
                alt={`Store Image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg border"
                width={64}
                height={64}
              />
              <input
                type="checkbox"
                checked={selectedImages.includes(image.photoId)}
                onChange={() => handleCheckboxChange(image.photoId)}
                className="ml-4"
              />
            </li>
          ))}
        </ul>
        <button
          onClick={() => onRemove(selectedImages)}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Remove Selected
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
