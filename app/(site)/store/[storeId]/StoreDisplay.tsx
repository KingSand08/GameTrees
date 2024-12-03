"use client";
import Image from "next/image";
import GameRow from "@/types/models/GameRow";
import StoreDetails from "@/types/models/StoreDetail";
import StoreHours from "@/types/models/StoreHours";
import WishListButton from "@/app/ui/components/buttons/WishListButton";
import WishlistRow from "@/types/models/WishlistRow";
import Link from "next/link";

interface StoreDisplayProps {
    uid: number | null;
    storeDetails: StoreDetails | null;
    games: GameRow[];
    storeHours: StoreHours[];
    userRole: string;
    wishlist: WishlistRow[];
}

const StoreDisplay = ({ uid, storeDetails, games, storeHours, userRole, wishlist}: StoreDisplayProps) => {

return (
    <div>
        {/* Store Information */}
        <div className="hero bg-base-300 flex justify-center items-center">
            <div className="hero-content flex-col lg:flex-row w-full max-w-7xl">
                {/* Store Information */}
                {storeDetails && (
                <div className="text-white p-4 rounded-lg w-full lg:w-1/2">
                    <div>
                    <h1 className="text-5xl font-bold whitespace-nowrap">
                        {storeDetails.name}
                    </h1>
                    <p>
                        <strong className="mr-1">Address:</strong>
                        {storeDetails.address}
                    </p>
                    <p>
                        <strong className="mr-1">Modality:</strong>
                        {storeDetails.modality}
                    </p>
                    </div>
                </div>
                )}

                {/* Operating Hours */}
                <div className="text-white p-4 rounded-lg shadow-md w-full lg:w-1/2 lg:ml-4 lg:order-last">

                    <h2 className="text-lg font-bold mb-2 ">Operating Hours</h2>

                    {storeHours.length === 0 ? (
                        <p className="text-center">No operating hours available.</p>
                    ) : (
                        <table className="table table-sm bg-neutral text-neutral-content max-w-96">
                        <thead>
                            <tr>
                            <th className="text-left">Weekday</th>
                            <th className="text-left">Open</th>
                            <th className="text-left">Close</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storeHours.map((hour, index) => (
                            <tr key={index}>
                                <td className="font-bold">{hour.day}:</td>
                                <td>{hour.start_time}</td>
                                <td>{hour.end_time}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>



        {/* Games Section */}
        <div className="space-y-4 p-6">
        <h2 className="text-xl font-bold">Games Available</h2>
            {games.map((game) => (
                <div
                    key={game.gid}
                    className="flex flex-col lg:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
                >
                    {/* Game Image */}
                    <div
                    className="flex-shrink-0 w-60 h-56 overflow-hidden rounded-lg bg-gray-700"
                    style={{ flexBasis: "22rem" }}
                    >
                        <Link href={`/game/${game.gid}`}>
                            {game.image ? (
                                <Image
                                src={game.image}
                                alt={`${game.title} cover`}
                                className="w-full h-full object-contain"
                                width={1000}
                                height={1000}
                                quality={100}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Game Details */}
                    <div className="ml-4 flex-grow">
                        <h2 className="text-xl font-bold text-content">
                            <Link 
                                href={`/game/${game.gid}`}
                                className="hover:text-secondary transition-colors duration-300"
                            >
                                {game.title}
                            </Link>
                            
                        </h2>
                        <p className="text-gray-400">Price: ${game.price}</p>
                        <p className="text-gray-400">Platforms: {game.platforms || "No platforms available"}</p>
                    </div>

                    {/* Add to Wishlist Button */}
                    <div className="ml-auto">
                        {
                            <WishListButton
                             uid ={uid}
                             game ={game}
                             userRole ={userRole}
                             myWishlist={wishlist}>
                             </WishListButton>
                        }
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default StoreDisplay;
