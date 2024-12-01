import { StoreRepository } from "@/database/queries/store/StoreRepository";
import { StoreDetailRep } from "@/database/queries/store/StoreDetailRep";
import { StoreHoursRep } from "@/database/queries/store/StoreHoursRep";
import Image from "next/image";

interface StorePageProps {
    params: { storeId: string };
}

export default async function StorePage({ params }: StorePageProps) {
    const storeId = params.storeId;

    const storeRepository = new StoreRepository();
    const storeDetailRep = new StoreDetailRep();
    const storeHoursRep = new StoreHoursRep();

    try {
        // Fetch data from your database or backend logic
        const [games, storeDetails, storeHours] = await Promise.all([
            storeRepository.getGamesByStoreId(storeId),
            storeDetailRep.getStoreDetails(storeId),
            storeHoursRep.getStoreHours(storeId),
        ]);

        return (
            <div>
                <h1>Store Page for Store ID: {storeId}</h1>

                {/* Store Information */}
                {storeDetails && (
                    <div className="flex justify-between items-start bg-gray-900 text-white p-4 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-lg font-bold mb-2">Store Information</h2>
                            <p><strong>Store name:</strong> {storeDetails.name}</p>
                            <p><strong>Modality:</strong> {storeDetails.modality}</p>
                            <p><strong>Address:</strong> {storeDetails.address}</p>
                        </div>

                        {/* Operating Hours */}
                        <div>
                            <h2 className="text-lg font-bold mb-2">Operating Hours</h2>
                            {storeHours.length === 0 ? (
                                <p>No operating hours available.</p>
                            ) : (
                                <table className="text-sm">
                                    <tbody>
                                        {storeHours.map((hour, index) => (
                                            <tr key={index}>
                                                <td className="pr-4 font-semibold">{hour.day}:</td>
                                                <td className="pr-4">Open: {hour.start_time}</td>
                                                <td>Close: {hour.end_time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {/* Games Section */}
                <h2 className="text-xl font-bold mt-8">Games Available</h2>
                <div className="space-y-4">
                    {games.map((game, index) => (
                        <div
                            key={index}
                            className="flex flex-col lg:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
                        >
                            {/* Game Image */}
                            <div
                                className="flex-shrink-0 w-60 h-56 overflow-hidden rounded-lg bg-gray-700"
                                style={{ flexBasis: "22rem" }}
                            >
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
                            </div>

                            {/* Game Details */}
                            <div className="ml-4 flex-grow">
                                <h2 className="text-xl font-bold">{game.title}</h2>
                                <p className="text-gray-400">Price: ${game.price}</p>
                                <p className="text-gray-400">Platforms: {game.platforms || "No platforms available"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching store data:", error);
        return (
            <div>
                <h1>Store Page for Store ID: {storeId}</h1>
                <p>Failed to load store data.</p>
            </div>
        );
    }
}
