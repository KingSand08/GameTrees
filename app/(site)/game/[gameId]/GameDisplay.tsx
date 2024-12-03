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
      {/* Game Information */}
      {details && (
        <div className="hero bg-base-300 flex justify-center items-center">
          <div className="hero-content flex-col lg:flex-row justify-evenly w-full max-w-7xl">
            {/* Game Image */}
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

            {/* Game Details */}
            <div className="text-white p-4 w-full lg:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{details.title}</h1>
              <p className="mb-2">
                <strong>Developer:</strong> {details.developer}
              </p>
              <p className="mb-2">
                <strong>Description:</strong> {details.description}
              </p>
              <p className="mb-2">
                <strong>Published Price:</strong> ${details.price}
              </p>
            </div>

            {/* Add to Wishlist Button */}
            <div className="lg:ml-6">
              <WishListButton
                uid={uid}
                game={details}
                userRole={userRole}
                myWishlist={wishlist}
              />
            </div>
          </div>
        </div>
      )}


      {/* Stores Section */}
  
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-bold text-center">Available in Stores</h2>
          {stores.map((store, index) => (
          <div
            key={index}
            className="flex flex-row md:flex-col bg-gray-800 rounded-lg p-4 shadow-lg"
            >
            {/* Store Details */}
            <div className="ml-4 flex-grow grid-cols-2">
              
            <div className="text-xl font-bold text-white">
              <Link
                href={`/store/${store.store_id}`}
                className="hover:text-secondary transition-colors duration-300"
              >
                {store.store_name}
              </Link>
            </div>
              
              <div className="text-sm font-medium text-gray-400">
                    Address: {store.address}
              </div>

              <p className="text-success">Discount: {store.discount}%</p>
              <p className="text-info">Selling Price: ${store.price}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDisplay;
