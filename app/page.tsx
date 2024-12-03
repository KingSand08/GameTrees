import TrendingGames from "./ui/components/games/TrendingSection";
import HighlightStores from "./ui/components/structural/Hero";
import BestGameDeals from "./ui/components/games/BestGameDeals";
import { getTrendingGames } from "@/database/queries/game/getTrendingGames";

export default async function Home() {
  const trendingGames = await getTrendingGames();

  return (
    <div className="min-h-screen text-gray-100 space-y-12">
      <HighlightStores />

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