import TrendingGames from "./ui/components/games/TrendingSection";
import HighlightStores from "./ui/components/structural/Hero";
import BestGameDeals from "./ui/components/games/BestGameDeals";
import { getTrendingGames } from "@/database/queries/game/getTrendingGames";
import { SeparateStoresRep } from "@/database/queries/store/SeparateStores";
import { DiscountedGamesRep } from "@/database/queries/game/DiscountedGames";

export default async function Home() {
  const storeRep = new SeparateStoresRep();
  const highlightStores = await storeRep.getBayAreaStores();
  const trendingGames = await getTrendingGames();
  const bestDeals = await DiscountedGamesRep.getBestGameDeals(50);

  return (
    <div className="min-h-screen text-gray-100 space-y-12">
      <div>
        {/* Highlight Stores Section  */}
        <HighlightStores stores={highlightStores}/>
      </div>

      <hr className="border-2 border-neutral opacity-30 rounded-xl w-full" />

      <div>
        {/* Trending Section  */}
        <TrendingGames games={trendingGames} />
      </div>

      <hr className="border-2 border-neutral opacity-30 rounded-xl w-full" />

      <div>
        {/* <BiggestDiscounts games={biggestDiscounts} /> */}
        <BestGameDeals bestDeals={bestDeals}/>
      </div>
    </div>
  );
}