"use client"
import Image from "next/image";

import { useRouter } from "next/navigation";

type GameCardProps = {
  gameId: number; // Unique identifier for the game
  title: string;
  genre: string;
  lowestPrice: number | null;
  wishlistCount: number;
  image?: string | null; // Optional prop for game image
};

const GameCard: React.FC<GameCardProps> = ({
  gameId,
  title,
  genre,
  lowestPrice,
  wishlistCount,
  image, // Default placeholder image
}) => {
    

    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/game/${gameId}`); // Navigate to the game's details page
    };

    return (
        <div className="card card-compact bg-neutral w-96 shadow-xl">
        {/* <figure>
            <img src={image} alt={`${title} Image`} />
        </figure> */}
        <div className="trending-game-content text-base-content flex-col lg:flex-row gap-8">
                <Image
                  src={image as string}
                  alt={title}
                  width={300} 
                  height={200}
                  quality={100} 
                  style={{
                    objectFit: 'cover', // Ensures the image is cropped to fill the container
                    width: '700px',
                    height: '500px',
                  }}
                  className="rounded-lg shadow-2xl"
                />
        </div>
        
        <div className="card-body text-neutral-content">
            <h2 className="card-title">{title}</h2>
            <p className="text-sm text-gray-400">{genre}</p>
            <p className="text-md font-semibold text-green-400">As low as: {lowestPrice}</p>   
            <p className="text-md font-semibold text-green-400">Wishlisted by: {wishlistCount} users</p>
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
