import React, { useState } from "react";
import StoreCard from "./StoreCard";

type StoreHours = {
    day: string; // E.g., "Monday", "Tuesday"
    start_time: string; // E.g., "10:00:00"
    end_time: string; // E.g., "20:00:00"
};

type Store = {
    id: number;
    name: string;
    address: string;
    modality: string;
    city: string;
    hours: StoreHours[];
};

type StoresListProps = {
    stores: Store[];
    title: string;
};

const StoresList: React.FC<StoresListProps> = ({ stores = [], title }) => {
    const [visibleCount, setVisibleCount] = useState(6); // Show 6 cards by default
    const DEFAULT_VISIBLE_COUNT = 6;

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Show 6 more cards
    };

    const handleShowLess = () => {
        setVisibleCount(DEFAULT_VISIBLE_COUNT); // Reset to default
    };

    return (
        <div className="space-y-6 text-base-content justify-center p-4">
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.slice(0, visibleCount).map((store) => (
                        <StoreCard key={store.id} {...store} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {visibleCount < stores.length && (
                    <button className="btn btn-secondary mr-4" onClick={handleShowMore}>
                        Show More
                    </button>
                )}
                {visibleCount > DEFAULT_VISIBLE_COUNT && (
                    <button className="btn btn-accent" onClick={handleShowLess}>
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default StoresList;
