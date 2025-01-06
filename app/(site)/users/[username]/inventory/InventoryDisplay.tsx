"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StoreRow from "@/types/models/StoreRow";
import StoreModal from "@/app/ui/components/modals/StoreModal";
import GameModal from "@/app/ui/components/modals/GameModal";
import CreateStoreModal from "@/app/ui/components/modals/CreateStoreModal";
import Game from "@/types/models/Game";
import Business from "@/types/models/Business"

interface InventoryDisplayProps {
    uid: string | "";
    stores: StoreRow[];
    myStores: StoreRow[];
    unclaimedStores: StoreRow[];
    games: Game[];
    businesses: Business[];
    userRole: string | "";
    canEdit: boolean;
}

export default function InventoryDisplay({ uid, stores, unclaimedStores, games, businesses, canEdit }: InventoryDisplayProps) {
    const [selectedStores, setSelectedStores] = useState<number[]>([]);
    const [message, setMessage] = useState<string | null>(null); 
    const [isStoreModalOpen, setStoreModalOpen] = useState(false);
    const [isGameModalOpen, setGameModalOpen] = useState(false);   
    const [isCreateStoreModalOpen, setCreateStoreModalOpen] = useState(false);   
    const [isSelectAll, setSelectAll] = useState(false);

    const router = useRouter();

    const handleCheckboxChange = (id: number) => {
        setSelectedStores((prevSelected) => {
            if (prevSelected.includes(id)) {
                // Remove game from selection if already selected
                return prevSelected.filter((id) => id !== id);
            } else {
                // Add game to selection if not selected
                return [...prevSelected, id];
            }
        });
    };

    const handleRemoveStores = async (selectedStores: number[]) => {
        try {
            const response = await fetch("/api/inventory/remove-store", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({storeIds: selectedStores, managerId: uid}),
            });

            const data = await response.json();

            if (response.ok) {
                router.refresh();
                setSelectedStores([]); 
                setMessage("Stores removed successfully!")
                setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds                        
            } else {
                setMessage(`Failed to remove stores: ${data.message}`)
                setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds                        
            }
        }
        catch (error) {
            setMessage("Error while removing stores: " + error);
            setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds                     
        }
    }

    const openModal = async (type: string) => {
        switch (type) {
            case "store": setStoreModalOpen(true); return;
            case "game": setGameModalOpen(true); return;
            case "create": setCreateStoreModalOpen(true); return;
        }
    }

     // Closes all opening modals
     const handleCloseModal = () => {
        setStoreModalOpen(false);
        setGameModalOpen(false);
        setCreateStoreModalOpen(false);
    };

    const handleSave = async (array: string[], type: string) => {
        const storeData = new FormData();
        if (array.length > 0) {
                if (type === "store") {
                    storeData.append("managerId", uid);
                    storeData.append("storeIds", JSON.stringify(array));
                }
                
                if (type === "game") {
                    if (selectedStores.length === 0) {
                        setMessage("No stores selected. Unable to proceed.");
                        setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds                        
                    }
                    else {
                        storeData.append("storeIds", JSON.stringify(selectedStores));
                        storeData.append("gameIds", JSON.stringify(array));
                    }
                }

                if (type === "create") {
                    storeData.append("store_name", array?.[0] as string);
                    storeData.append("street", array?.[1] as string);
                    if (array?.[2] !== "") storeData.append("city", array?.[2] as string);
                    if (array?.[3] !== "") storeData.append("state", array?.[3] as string);
                    if (array?.[4] !== "") storeData.append("zip", array?.[4] as string);
                    if (array?.[5] !== "") storeData.append("country", array?.[5] as string);
                    if (array?.[6] !== "") storeData.append("modality", array?.[6] as string);
                    storeData.append("bid", array?.[7] as string);
                    storeData.append("mid", uid);
                }
            
            try {
                let response = new Response();
                
                if (type === "store") {
                    response = await fetch("/api/inventory/add-store", {
                        method: "PATCH",
                        body: storeData,
                    });
                }
                    
                if (type === "game") {
                    response = await fetch("/api/inventory/add-game", {
                        method: "PATCH",
                        body: storeData,
                    });
                }
                
                if (type === "create") {
                    response = await fetch("/api/inventory/create-store", {
                        method: "PATCH",
                        body: storeData,
                    });
                }
                        
                if (response.ok) {
                    router.refresh(); 
                    setMessage("Added successfully!")
                    setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds                        
                } 
            } 
            catch (error) {
                setMessage("Error while adding: " + error);
                setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds                        
            }
            
            // Close modal upon success, remove this line if allow users to continue
            setStoreModalOpen(false);
            setCreateStoreModalOpen(false)
        }
        else {
            setMessage("Error: No items selected. Unable to proceed.");
            setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds
        }
    }

    const handleSelectAll = () => {
        if (!isSelectAll) setSelectedStores(games.map((game) => game.gid));
        else setSelectedStores([]);
        setSelectAll(!isSelectAll);
    }

    return (
        <div className="space-y-4">
            {message && (
                <div
                    className={`${
                        message.includes("successfully") ? "bg-green-100 text-gray-700" : "bg-red-100 text-gray-700"
                    } p-4 mb-4 rounded`}
                >
                    {message}
                </div>
            )}

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                    {/* Remove Stores Button */}
                    <button
                        className="btn btn-primary bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                        onClick={() => handleRemoveStores(selectedStores)}
                        >
                            Remove Stores
                    </button>

                    {/* Claim ownership Button */}
                    <button
                        className="btn btn-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                        onClick={() => openModal("store")}
                        >
                            Claim As Manager
                    </button>
                    {/* Open Modal to claim stores */}
                    {isStoreModalOpen && (
                        <StoreModal
                            stores={unclaimedStores}
                            onClose={handleCloseModal}
                            onSave={handleSave}
                        />
                    )}

                    {/* Create a store Button */}
                    <button
                            className="btn btn-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                            onClick={() => openModal("create")}
                        >
                            Create Store
                    </button>
                    {/* Open Modal to add games */}
                    {isCreateStoreModalOpen && (
                        <CreateStoreModal
                            businesses={businesses}
                            onClose={handleCloseModal}
                            onSave={handleSave}
                        />
                    )}
                    
                    {/* Add Games Button */}
                    <button
                            className="btn btn-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                            onClick={() => openModal("game")}
                        >
                            Add Games to Selected Stores
                    </button>
                    {/* Open Modal to add games */}
                    {isGameModalOpen && (
                        <GameModal
                            games={games}
                            onClose={handleCloseModal}
                            onSave={handleSave}
                        />
                    )}
                </div>
                    
                {/* Select/Deselect All Button */}
                <div className="flex justify-end">
                    <button
                            className="btn btn-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg border-2 border-white shadow-lg mb-4"
                            onClick={handleSelectAll}
                        >
                            {isSelectAll ? "Deselect All Stores" : "Select All Stores"}
                    </button>
                </div>
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
