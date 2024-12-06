import React, { useState } from "react";
import GameDetails from "@/types/models/GameDetails";

interface GameEditModalProps {
  details: GameDetails;
  onSave: (updatedDetails: GameDetails) => void;
}

const GameEditModal: React.FC<GameEditModalProps> = ({ details, onSave }) => {
  const [formData, setFormData] = useState<GameDetails>({ ...details });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value).toFixed(2) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const apiUrl = `/api/admin/edit-game/${details.gid}`;
      const formDataToSend = new FormData();

      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("price", formData.price?.toString() || "");
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const rawError = await response.text();
        console.error("Raw response:", rawError); // Log the raw HTML/response for debugging
        setToastMessage("Error: " + rawError);
        return;
      }

      const modal = document.getElementById("game_edit_modal") as HTMLDialogElement;
      if (modal) modal.close();
      setToastMessage("Game updated successfully! REFRESH to see the results!");
      onSave(formData);
      (document.getElementById("game_edit_modal") as HTMLDialogElement).close();

    } catch (error) {
      console.error("Unexpected error while updating game:", error);
      setToastMessage("Failed to update game. Please check the console for details.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div>
      {/* Modal Element */}
      <dialog id="game_edit_modal" className="modal">
        <div className="modal-box text-base-content">
          <h3 className="font-bold text-lg">Edit Game</h3>
          <form className="space-y-4">
            {/* Description Field */}
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            {/* Price Field */}
            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || 0}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="label">
                <span className="label-text">Upload New Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              {selectedImage && (
                <p className="text-sm text-gray-500 mt-2">Selected Image: {selectedImage.name}</p>
              )}
            </div>
          </form>

          {/* Modal Actions */}
          <div className="modal-action">
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn"
              onClick={() =>
                (document.getElementById("game_edit_modal") as HTMLDialogElement).close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameEditModal;
