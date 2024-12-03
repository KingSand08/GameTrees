import React from "react";
import Link from "next/link";
import { DiscountedGamesRep } from "@/database/queries/game/DiscountedGames";

async function fetchBestGameDeals() {
    return await DiscountedGamesRep.getBestGameDeals(50);
}

const BestGameDeals = async () => {
    const bestDeals = await fetchBestGameDeals();

    // Deduplicate games by gid
    const uniqueDeals = Array.from(new Map(bestDeals.map((deal) => [deal.gid, deal])).values());

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Best Game Deals</h2>
            <table className="table w-full bg-neutral">
                {/* Table Header */}
                <thead className="bg-neutral text-white">
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
                            className="hover"
                        >
                            <td>
                                <Link href={`/game/${deal.gid}`}>
                                    <span className="underline text-primary">
                                        {deal.title}
                                    </span>
                                </Link>
                            </td>
                            <td className="text-neutral-content">${deal.price}</td>
                            <td className="text-neutral-content">{(deal.discount * 100)}%</td>
                            <td className="text-green-500">
                                ${(deal.price * (1 - deal.discount)).toFixed(2)}
                            </td>
                            <td>{deal.storeName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BestGameDeals;
