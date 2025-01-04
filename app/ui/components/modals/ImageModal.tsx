"use client";
import React from "react";
import Image from "next/image"
import ImageRow from "@/types/models/ImageRow";

interface ImageModalProps {
  images: ImageRow[]; // Array of image URLs
  onClose: () => void; // Function to close the modal
  onRemove: (image: string) => void; // Function to remove an image
}

const ImageModal: React.FC<ImageModalProps> = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Remove Store Image</h2>
        <ul className="space-y-2">
          {images.map((image, index) => (
            <li key={index} className="flex items-center justify-between">
              <Image
                src={image.image || "No photo"}
                alt={`Store Image ${index + 1}`}
                className="w-16 h-16 object-cover rounded-lg border"
              />
              {/* <button
                onClick={() => onRemove(image)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                Remove
              </button> */}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
