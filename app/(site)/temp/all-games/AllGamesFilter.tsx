import React from "react";

interface GameFilterProps {
    onSortChange: (sortType: string) => void; 
    onDeveloperChange: (developer: string | null) => void; 
    developers: string[]; 
}

const AllGamesFilter: React.FC<GameFilterProps> = ({
    onSortChange,
    onDeveloperChange,
    developers,
}) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value); 
    };

    const handleDeveloperChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onDeveloperChange(e.target.value || null);
    };

    return (
        <div className="flex items-center mb-4 gap-4">
            {/* Sort By Dropdown */}
            <div>
                <label htmlFor="sort" className="text-lg font-medium text-base-content mr-2">
                    Sort By:
                </label>
                <select
                    id="sort"
                    className="select select-neutral text-base-content"
                    onChange={handleSortChange}
                >
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                </select>
            </div>

            {/* Developer Filter Dropdown */}
            <div>
                <label htmlFor="developer" className="text-lg font-medium text-base-content mr-2">
                    Filter by Developer:
                </label>
                <select
                    id="developer"
                    className="select select-neutral text-base-content"
                    onChange={handleDeveloperChange}
                >
                    <option value="">All Developers</option>
                    {developers.map((developer, index) => (
                        <option key={index} value={developer}>
                            {developer}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default AllGamesFilter;
