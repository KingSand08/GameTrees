"use client"

import React from "react";
import Link from "next/link";

export type GameDeal = {
    gid: number;
    title: string;
    price: number;
    discount: number;
    discountedPrice: number;
    storeName: string;
    storeId: number;
};

type BestDealProps = {
    bestDeals: GameDeal[];
};

const BestGameDeals: React.FC<BestDealProps> = ({bestDeals}) => {

    // Deduplicate games by gid
    const uniqueDeals = Array.from(new Map(bestDeals.map((deal) => [deal.gid, deal])).values());

    return (
        <div className="text-base-content overflow-x-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Best Game Deals</h2>
            <table className="table w-full bg-neutral">
                {/* Table Header */}
                <thead className="bg-neutral text-neutral-content">
                    <tr>
                        <th>Game</th>
                        <th>Original Price</th>
                        <th>Discount</th>
                        <th>Discounted Price</th>
                        <th>Store</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {uniqueDeals.map((deal) => (
                        <tr
                            key={deal.gid}
                            className="hover:bg-neutral-600"
                        >
                            <td>
                                <Link href={`/game/${deal.gid}`}>
                                    <span className="font-semibold text-info hover:underline">
                                        {deal.title}
                                    </span>
                                </Link>
                            </td>
                            <td className="text-neutral-content">${deal.price}</td>
                            <td className="text-neutral-content">{(deal.discount * 100)}%</td>
                            <td className="text-green-500">
                                ${(deal.price * (1 - deal.discount)).toFixed(2)}
                            </td>
                            <td className="text-neutral-content">{deal.storeName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BestGameDeals;
