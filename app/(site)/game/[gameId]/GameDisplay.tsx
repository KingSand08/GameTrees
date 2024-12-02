"use client";
import Image from "next/image";
import StoreRow from "@/types/models/StoreRow";
import GameDetails from "@/types/models/GameDetails";
import Link from "next/link";
import WishListButton from "@/app/ui/components/buttons/WishListButton";
import WishlistRow from "@/types/models/WishlistRow";

interface GameDisplayProps {
  gid: string;
  details: GameDetails | undefined;
  stores: StoreRow[];
  uid: number | null;
  userRole: string;
  wishlist: WishlistRow[];
}

const GameDisplay = ({details, stores, uid, userRole, wishlist }: GameDisplayProps) => {
  return (
    <div>
      <h1>Game Page</h1>

      {/* Game Information */}
      {details && (
        <div className="flex justify-between items-start bg-gray-900 text-white p-4 rounded-lg shadow-md">
            <div
                className="flex-shrink-0 w-60 h-56 overflow-hidden rounded-lg bg-gray-700"
                style={{ flexBasis: "22rem" }}
                >
                    <Link href={`/game/${details.gid}`}>
                        {details.image ? (
                            <Image
                            src={details.image}
                            alt={`${details.title} cover`}
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
            <div>
            <h1 className="text-xl font-bold">{details.title}</h1>
            <p>
              <strong>Developer:</strong> {details.developer}
            </p>
            <p>
              <strong>Description:</strong> {details.description}
            </p>
            <p>
              <strong>Published Price:</strong> ${details.price}
            </p>
          </div>

          {/* Add to Wishlist Button */}
          <div className="ml-auto">
            <WishListButton uid={uid} game={details} userRole={userRole} myWishlist={wishlist} />
          </div>
        </div>
      )}

      {/* Stores Section */}
      <h2 className="text-xl font-bold mt-8">Available in Stores</h2>
      <div className="space-y-4">
        {stores.map((store, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
          >
            {/* Store Details */}
            <div className="ml-4 flex-grow">
              <h2 className="text-xl font-bold">
                <Link href={`/store/${store.store_id}`}>{store.store_name}</Link>
              </h2>
              <p className="text-gray-400">Address: {store.address}</p>
              <p className="text-gray-400">Discount: {store.discount}%</p>
              <p className="text-gray-400">Selling Price: ${store.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDisplay;
