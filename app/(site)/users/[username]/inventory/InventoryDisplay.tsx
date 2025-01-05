"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StoreRow from "@/types/models/StoreRow";

interface InventoryDisplayProps {
    uid: string | "";
    stores: StoreRow[];
    myStores: StoreRow[];
    userRole: string | "";
    canEdit: boolean;
}

export default function InventoryDisplay({ stores, canEdit }: InventoryDisplayProps) {
    const [selectedStores, setSelectedStores] = useState<number[]>([]);

    const handleCheckboxChange = (storeId: number) => {
        setSelectedStores((prevSelected) => {
            if (prevSelected.includes(storeId)) {
                // Remove game from selection if already selected
                return prevSelected.filter((id) => id !== storeId);
            } else {
                // Add game to selection if not selected
                return [...prevSelected, storeId];
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                {/* Remove Stores Button */}
                <button
                    className="btn btn-primary bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                    // onClick={() => handleRemoveStores(selectedStores)}
                    >
                        Remove Stores
                </button>

                {/* Create a store Button */}
                <button
                        className="btn btn-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                        // onClick={handleCreateStore}
                    >
                        Create Store
                </button>
                
                {/* Add Games Button */}
                <button
                        className="btn btn-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                        // onClick={() => handleAddGames(selectedStores)}
                    >
                        Add Games to Selected Stores
                </button>
            </div>

            {stores.length > 0 ? (
                stores.map((store, index) => (
                    <div
                        key={index}
                        className="flex flex-col min-[1110px]:flex-row items-center rounded-lg shadow-lg bg-gray-900" //! change bg later but just use for now until theme issues are resolved
                    >
                        {/* Game Image */}
                        <div
                            className="flex-shrink-0 w-60 h-56 m-0 min-[1110px]:m-4 overflow-hidden rounded-lg bg-gray-800" //! change bg later but just use for now until theme issues are resolved
                            style={{ flexBasis: "22rem" }}
                        >
                          
                            {store.image ? (
                                <Image
                                    src={store.image}
                                    alt={`${store.store_name} cover`}
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
                        </div>

                        {/* Game Details */}
                        <div className="ml-4 flex-grow">
                            <div className="flex items-center justify-between">
                            <Link href={`/store/${store.store_id}`}>
                                <h2 className="max-[1200px]:pt-8 text-xl font-bold hover:underline">{store.store_name}</h2>
                            </Link>
                            {canEdit && (
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-6 w-6 text-primary rounded-lg mr-4"
                                    checked={selectedStores.includes(store.store_id)} 
                                    onChange={() => handleCheckboxChange(store.store_id)}
                                />
                            )}
                            </div>
                            <p className="max-[1200px]:pt-2 text-gray-400">Address: {store.address}</p>
                            <p className="max-[1200px]:pt-2 text-gray-400">Modality: {store.modality}</p>
                            <p className="max-[1200px]:pt-2 text-gray-400">Games Available: {store.available}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Your inventory is empty!</p>
            )}
        </div>
    );
}
