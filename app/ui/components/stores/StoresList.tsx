import React, { useState } from "react";
import StoreCard from "./StoreCard";

type Store = {
    id: number;
    name: string;
    address: string;
    opsDays: string;
    opsHours: string;
    modality: string;
};

type StoresListProps = {
    stores: Store[];
    title: string;
};

const StoresList: React.FC<StoresListProps> = ({ stores = [], title }) => {
    const [visibleCount, setVisibleCount] = useState(6); // Show 6 cards by default (2 rows if each row has 3 cards)
    const DEFAULT_VISIBLE_COUNT = 6;

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Show 6 more cards per click
    };

    const handleShowLess = () => {
        setVisibleCount(DEFAULT_VISIBLE_COUNT); // Reset to default visible count
    };

    return (
        <div className="space-y-6 text-base-content justify-center p-4">
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.slice(0, visibleCount).map((store) => (
                        <StoreCard
                            key={store.id}
                            name={store.name}
                            address={store.address}
                            opsDays={store.opsDays}
                            opsHours={store.opsHours}
                            modality={store.modality}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {visibleCount < stores.length && (
                    <button
                        className="btn btn-secondary mr-4"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                )}
                {visibleCount > DEFAULT_VISIBLE_COUNT && (
                    <button
                        className="btn btn-accent"
                        onClick={handleShowLess}
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default StoresList;
