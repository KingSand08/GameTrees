"use client"

import React, { useState } from "react";
import GameCard from "./GameCard";

export type TrendingGame = {
  gid: number;
  title: string;
  genre: string;
  lowestPrice: number;
};

type TrendingGamesProps = {
  games: TrendingGame[];
};

const TrendingGames: React.FC<TrendingGamesProps> = ({ games }) => {
    const [visibleCount, setVisibleCount] = useState(6); // Show 6 cards by default
    const DEFAULT_VISIBLE_COUNT = 6;


    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Show 6 more cards
    };

    const handleShowLess = () => {
        setVisibleCount((prevCount) => DEFAULT_VISIBLE_COUNT); // Reset to default
    };
  return (
    <div className="test-base-content justify-center">
      <h2 className="text-2xl font-bold text-center mb-6">Trending Games</h2>
      <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, visibleCount).map((game) => (
                <GameCard
                    key={game.gid}
                    gameId={game.gid}
                    title={game.title}
                    genre={game.genre}
                    lowestPrice={game.lowestPrice}
                    // Replace with actual image URLs if available, or keep placeholder
                    imageUrl={`https://fakeimg.pl/500x500?text=${encodeURIComponent(game.title)}`}
                />
            ))}
          </div>
      </div>
      <div className="flex justify-center mt-4">
                {visibleCount < games.length && (
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

export default TrendingGames;
