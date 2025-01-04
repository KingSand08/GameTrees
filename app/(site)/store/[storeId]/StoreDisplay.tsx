"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GameRow from "@/types/models/GameRow";
import StoreDetails from "@/types/models/StoreDetail";
import StoreHours from "@/types/models/StoreHours";
import WishListButton from "@/app/ui/components/buttons/WishListButton";
import WishlistRow from "@/types/models/WishlistRow";
import ImageRow from "@/types/models/ImageRow";
import ImageCarousel from "@/app/ui/components/structural/ImageCarousel";
import ImageModal from "@/app/ui/components/modals/ImageModal";
import Link from "next/link";

interface StoreDisplayProps {
    images: ImageRow[];
    storeId: string;
    uid: number | null;
    storeDetails: StoreDetails | undefined;
    games: GameRow[];
    storeHours: StoreHours[];
    userRole: string;
    wishlist: WishlistRow[];
    canEdit: boolean;
}

const StoreDisplay = ({images, storeId, uid, storeDetails, games, storeHours, userRole, wishlist, canEdit}: StoreDisplayProps) => {
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [isInventoryEditing, setInventoryEditing] = useState(false);
    const [editedName, setEditedName] = useState(storeDetails?.name || "");
    const [editedStreet, setEditedStreet] = useState(storeDetails?.street || "");
    const [editedCity, setEditedCity] = useState(storeDetails?.city || "");
    const [editedState, setEditedState] = useState(storeDetails?.state || "");
    const [editedZipCode, setEditedZipCode] = useState(storeDetails?.zipCode || "");
    const [editedCountry, setEditedCountry] = useState(storeDetails?.country || "");
    const [editedModality, setEditedModality] = useState(storeDetails?.modality || "");
    const [editedHours, setEditedHours] = useState(storeHours || []);
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState<string | null>(null); 
    
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const toggleInventoryEditMode = () => {
        setInventoryEditing(!isInventoryEditing);
    }

    const hasChanges = editedName !== storeDetails?.name ||
                        editedStreet !== storeDetails?.street ||
                        editedCity !== storeDetails?.city ||
                        editedState !== storeDetails?.state ||
                        editedZipCode !== storeDetails?.zipCode ||
                        editedCountry !== storeDetails?.country ||
                        editedModality !== storeDetails.modality ||
                        editedHours.some(
                            (hour, index) =>
                                hour.start_time !== storeHours[index].start_time ||
                                hour.end_time !== storeHours[index].end_time
                        ) ||
                        selectedFile !== null;

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    }

    const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedStreet(e.target.value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCity(e.target.value);
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedState(e.target.value);
    };

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedZipCode(e.target.value);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCountry(e.target.value);
    };

    const handleModalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditedModality(e.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleRemovePhoto = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleRemoveImage = async (selectedImages: number[]) => {
        try {
            const response = await fetch("/api/images/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageIds: selectedImages }),
            });

            const data = await response.json();
    
            if (response.ok) {
                router.refresh(); 
                setMessage("Images deleted successfully!")
            } else {
                setMessage(`Failed to delete images: ${data.message}`)
            }
        } catch (error) {
            setMessage("Error while deleting images: " + error);
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000); // Clear after 5 seconds
            return () => clearTimeout(timer); // Cleanup
        }
    }, [message]);
  
    const handleHoursChange = (index: number, field: "start_time" | "end_time", value: string) => {
        const updatedHours = [...editedHours];
        updatedHours[index][field] = value;
        setEditedHours(updatedHours);
    };

    const handleStoreEdit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMsg("");

        const formData = new FormData();
        
        if (hasChanges) formData.append("storeId", storeId);
        if (editedName !== storeDetails?.name) formData.append("name", editedName);
        if (editedStreet !== storeDetails?.street) formData.append("street", editedStreet);
        if (editedCity !== storeDetails?.city) formData.append("city", editedCity);
        if (editedState !== storeDetails?.state) formData.append("state", editedState);
        if (editedZipCode !== storeDetails?.zipCode) formData.append("zipCode", editedZipCode.toString());
        if (editedCountry !== storeDetails?.country) formData.append("country", editedCountry);
        if (editedModality !== storeDetails?.country) formData.append("modality", editedModality);
        if (editedHours.some(
            (hour, index) =>
                hour.start_time !== storeHours[index].start_time ||
                hour.end_time !== storeHours[index].end_time
            )) formData.append("storeHours", JSON.stringify(editedHours));
        if (selectedFile) formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/store/update", {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                router.refresh(); 
                setIsEditing(false); 
                setErrorMsg("");
                setSelectedFile(null);
            } 
            else {
                setIsEditing(false);
                setErrorMsg(`Failed to update store details: ${data.message}`);
            }
        }
        catch (errorMsg) {
            setIsEditing(false);
            setErrorMsg(errorMsg as string);
        }
    };

    return (
        <div className="relative">
            <div>
                {message && (
                    <div
                        className={`${
                            message.includes("successfully") ? "bg-green-100 text-gray-700" : "bg-red-100 text-white"
                        } p-4 mb-4 rounded`}
                    >
                        {message}
                    </div>
                )}
        </div>

            {/* Conditionally render the Edit Store button for managers with permissions */}
            {canEdit && (
                <div className="flex justify-end items-start space-x-4 p-4">
                    <button
                        className="btn btn-primary text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                        onClick = {toggleEditMode}
                        >
                        {isEditing? "Cancel" : "Edit Store"}
                    </button>
                            
                    {/* Edit Inventories Button */}
                    <button
                        className="btn btn-primary text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                        onClick={toggleInventoryEditMode}
                    >
                        {isInventoryEditing ? "Cancel" : "Edit Inventories"}
                    </button>
                </div>
            )}

            {/* Store Information */}
            <div className="hero bg-base-200 flex justify-center items-center">   
                <div className="hero-content text-base-content flex-col lg:flex-row w-full max-w-7xl">       
                    {storeDetails && (
                    <div className=" p-4 rounded-lg w-full lg:w-1/2">
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={handleNameChange}
                                    className="text-5xl font-bold whitespace-nowrap"
                                    placeholder="Edit name"
                                    />
                            ) : (
                                <h1 className="text-5xl font-bold whitespace-nowrap">
                                {storeDetails.name}
                            </h1>
                            )}
                            
                            {isEditing ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedStreet}
                                        onChange={handleStreetChange}
                                        className="input input-bordered w-full mt-2"
                                        placeholder="Edit address"
                                        />
                                    <input
                                        type="text"
                                        value={editedCity}
                                        onChange={handleCityChange}
                                        className="input input-bordered w-full mt-2"
                                        placeholder="Edit city"
                                        />
                                    <input
                                        type="text"
                                        value={editedState}
                                        onChange={handleStateChange}
                                        className="input input-bordered w-full mt-2"
                                        placeholder="Edit state"
                                        />
                                    <input
                                        type="text"
                                        value={editedZipCode}
                                        onChange={handleZipCodeChange}
                                        className="input input-bordered w-full mt-2"
                                        placeholder="Edit zip code"
                                        />
                                    <input
                                        type="text"
                                        value={editedCountry}
                                        onChange={handleCountryChange}
                                        className="input input-bordered w-full mt-2"
                                        placeholder="Edit country"
                                        />
                                </div>
                            ) : (
                            <p>
                                <strong className="mr-1">Address:</strong>
                                {storeDetails.street && storeDetails.street}
                                {storeDetails.street && storeDetails.city && ', '}
                                {storeDetails.city && storeDetails.city}
                                {storeDetails.city && storeDetails.state && ', '}
                                {storeDetails.state && storeDetails.state}
                                {storeDetails.state && storeDetails.zipCode && ', '}
                                {storeDetails.zipCode && storeDetails.zipCode}
                                {storeDetails.zipCode && storeDetails.country && ', '}
                                {storeDetails.country && storeDetails.country}
                            </p>
                            )}

                            {isEditing ? (
                                <select
                                    value={editedModality}
                                    onChange={handleModalityChange}
                                    className="select select-bordered w-full mt-2"
                                >
                                    <option value="" disabled>Select a modality</option>
                                    <option value="Digital">Digital (Online)</option>
                                    <option value="Physical">Physical (In-Store)</option>
                                    <option value="Digital & Physical">Digital & Physical (Hybrid)</option>
                                </select>
                            ) : (
                                <p>
                                    <strong className="mr-1">Modality:</strong>
                                    {storeDetails.modality}
                                </p>
                            )}
                            
                            {isEditing ? (
                                <div className="block">
                                    <label className="text-sm font-medium text-gray-900 dark:text-white">Upload Store Image</label>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex flex-grow flex-col">
                                            <div className="flex items-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className={`cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg transition-all w-full mr-3
                                                    ${isEditingPhoto
                                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                                            : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                                        }`}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-5 w-5 mr-2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                        />
                                                    </svg>
                                                    <span className="md:text-base">
                                                        {selectedFile ? "Replace File" : "Choose File"}
                                                    </span>
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    disabled={!isEditingPhoto}
                                                    className="hidden"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                                                    className="ml-auto px-4 py-2 w-[6em] bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 border-2 border-white shadow-lg"
                                                >
                                                    {isEditingPhoto ? "Lock" : "Edit"}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={handleRemovePhoto}
                                                    className="ml-auto px-4 py-2 w-[6em] bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 border-2 border-white shadow-lg"
                                                >
                                                    Remove
                                                </button>

                                                {/* Other parts of the UI */}
                                                {isModalOpen && (
                                                    <ImageModal
                                                        images={images}
                                                        onClose={handleCloseModal}
                                                        onRemove={handleRemoveImage}
                                                    />
                                                )}
                                            </div>

                                            <div className="pt-2">
                                                <p className="text-sm text-base-content neutral">
                                                    {selectedFile ? selectedFile.name : "No file chosen"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                images && images.length > 0 ? (
                                    <ImageCarousel carouselImages={images} />
                                ) : (
                                    <p>No images available</p>
                                )
                            )}                            
                        </div>
                    </div>
                    )}

                    {/* Operating Hours */}
                    <div className="p-4 rounded-lg w-full lg:w-1/2 lg:ml-4 lg:order-last">
                        <h2 className="text-lg font-bold mb-2 ">Operating Hours</h2>
                        {isEditing ? (
                            <table className="table table-sm bg-base-100 text-base-content max-w-96">
                                <thead>
                                    <tr>
                                        <th className="text-left">Weekday</th>
                                        <th className="text-left">Open</th>
                                        <th className="text-left">Close</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {editedHours.map((hour, index) => (
                                        <tr key={index}>
                                            <td className="font-bold">{hour.day}:</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={hour.start_time}
                                                    onChange={(e) =>
                                                        handleHoursChange(index, "start_time", e.target.value)
                                                    }
                                                    className="input input-bordered w-full"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={hour.end_time}
                                                    onChange={(e) =>
                                                        handleHoursChange(index, "end_time", e.target.value)
                                                    }
                                                    className="input input-bordered w-full"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : storeHours.length === 0 ? (
                            <p className="text-center">No operating hours available.</p>
                        ) : (
                            <table className="table table-sm bg-base-100 text-base-content max-w-96">
                                <thead>
                                    <tr>
                                    <th className="text-left">Weekday</th>
                                    <th className="text-left">Open</th>
                                    <th className="text-left">Close</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeHours.map((hour, index) => (
                                    <tr key={index}>
                                        <td className="font-bold">{hour.day}:</td>
                                        <td>{hour.start_time}</td>
                                        <td>{hour.end_time}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                               
                        {/* Submit Button */}
                        {isEditing && hasChanges && (
                            <button
                                onClick={handleStoreEdit}
                                className="w-full px-4 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Games Section */}
            <div className="space-y-4 p-6">
            <h2 className="text-xl font-bold">Games Available</h2>
                {games.map((game) => (
                    <div
                        key={game.gid}
                        className="flex flex-col lg:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
                    >
                        {/* Checkbox (Only in Inventory Editing Mode) */}
                        {isInventoryEditing && (
                            <input
                                type="checkbox"
                                className="form-checkbox h-6 w-6 text-primary rounded-lg mr-4"
                            />
                        )}
                        {/* Game Image */}
                        <div
                        className="flex-shrink-0 w-60 h-56 overflow-hidden rounded-lg bg-gray-700"
                        style={{ flexBasis: "22rem" }}
                        >
                            <Link href={`/game/${game.gid}`}>
                                {game.image ? (
                                    <Image
                                    src={game.image}
                                    alt={`${game.title} cover`}
                                    className="w-full h-full object-contain"
                                    width={1000}
                                    height={1000}
                                    quality={100}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-gray-400">No Image</span>
                                    </div>
                                )}
                            </Link>
                        </div>

                        {/* Game Details */}
                        <div className="ml-4 flex-grow">
                            <h2 className="text-xl font-bold text-content">
                                <Link 
                                    href={`/game/${game.gid}`}
                                    className="hover:text-secondary transition-colors duration-300"
                                >
                                    {game.title}
                                </Link>
                                
                            </h2>
                            <p className="text-gray-400">Price: ${game.price}</p>
                            <p className="text-gray-400">Discount: {game.discount}%</p>
                            <p className="text-gray-400">Platforms: {game.platforms || "No platforms available"}</p>
                        </div>

                        {/* Add to Wishlist Button */}
                        <div className="ml-auto">
                            {
                                <WishListButton
                                    uid ={uid}
                                    game ={game}
                                    userRole ={userRole}
                                    myWishlist={wishlist}>
                                </WishListButton>
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Error Message */}
            {errorMsg && (
                <div className="text-white py-2 mt-4">
                    <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                        <p className="text-white">
                            {errorMsg}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreDisplay;