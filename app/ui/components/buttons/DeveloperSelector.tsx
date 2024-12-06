"use client";

import React from "react";

const BusinessDropdown = ({
    businesses,
    onSelect,
}: {
    businesses: { bid: string; name: string }[];
    onSelect: (bid: string) => void;
}) => {
    return (
        <div className="my-4">
            <label htmlFor="business-dropdown" className="block text-sm font-medium text-gray-700">
                Select a Business
            </label>
            <select
                id="business-dropdown"
                onChange={(e) => onSelect(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                <option value="">-- Select a Business --</option>
                {businesses.map((business) => (
                    <option key={business.bid} value={business.bid}>
                        {business.name || `Business #${business.bid}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BusinessDropdown;
