
import React, { useEffect, useState } from "react";
import HighlightGameCards from "./ui/components/structural/Hero";
import ScrollSection from "./ui/components/structural/ScrollSection";
import GameTable from "./ui/components/structural/GameTable";
import StoresList from "./ui/components/stores/StoresList";
import TrendingGames from "./ui/components/games/TrendingSection";
import { HomepageQueries, TrendingGame } from "@/database/queries/homepage/Homepage";
import HighlightStores from "./ui/components/structural/Hero";
// import BiggestDiscounts from "./ui/components/games/BiggestDiscounts";
import { DiscountedGamesRep } from "@/database/queries/game/DiscountedGames";
import BestGameDeals from "./ui/components/games/BestGameDeals";

// export async function fetchDiscountedGames(limit?: number) {
//   const discountedGamesRep = new DiscountedGamesRep();
//   return await discountedGamesRep.getBestGameDeals(limit);
// }

export default async function Home() {
  const discountedGamesRep = new DiscountedGamesRep();
  const trendingGames = await HomepageQueries.getTrendingGames();
  // const biggestDiscounts = await discountedGamesRep.getDiscountedGames(10); // Limiting to 10 games for the homepage
  // const discountedGames = await fetchDiscountedGames(5); // Fetch top 5 discounted games
  // console.log(discountedGames); // Verify data structure

  return (
    
    <div className="min-h-screen bg-base-100 text-gray-100 space-y-12">
      <HighlightStores />
      {/* <StoresList stores={bayAreaStores} title="Bay Area Stores" />       */}

      <div>
          {/* Trending Section  */}
          <TrendingGames games={trendingGames} />
      </div>

      <div>
        {/* <BiggestDiscounts games={biggestDiscounts} /> */}
        <BestGameDeals />

      </div>

    </div>
  );
}