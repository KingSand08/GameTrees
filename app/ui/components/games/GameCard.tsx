"use client"

import { useRouter } from "next/navigation";

type GameCardProps = {
  gameId: number; // Unique identifier for the game
  title: string;
  genre: string;
  lowestPrice: number | null;
  imageUrl?: string; // Optional prop for game image
};

const GameCard: React.FC<GameCardProps> = ({
  gameId,
  title,
  genre,
  lowestPrice,
  imageUrl = "https://fakeimg.pl/500x500?text=Game+Image", // Default placeholder image
}) => {
    


    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/game/${gameId}`); // Navigate to the game's details page
    };

    const formattedPrice =
        lowestPrice !== null && lowestPrice !== undefined
        ? `$${lowestPrice.toFixed(2)}`
        : "Price unavailable";

    return (
        <div className="card card-compact bg-neutral w-96 shadow-xl">
        <figure>
            <img src={imageUrl} alt={`${title} Image`} />
        </figure>
        <div className="card-body text-neutral-content">
            <h2 className="card-title">{title}</h2>
            <p className="text-sm text-gray-400">{genre}</p>
            <p className="text-md font-semibold text-green-400">As low as: {formattedPrice}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm" onClick={handleViewDetails}>
                View Details
            </button>
            </div>
        </div>
    </div>
  );
};

export default GameCard;
