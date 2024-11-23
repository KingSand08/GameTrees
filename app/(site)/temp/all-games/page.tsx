import React from "react";
import AllGamesDisplay from "./AllGamesDisplay";
import { getAllGames } from "@/database/queries/game/getAllGames";
import { getUserWishlist } from "@/database/queries/wishlist/getWishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";

export default async function AllGamesPage({ }) {
    const session = await getServerSession(authOptions);

    try {
        // Fetch the games from the database and curren user's wishlist
        const [games, wishlist, role] = await Promise.all([
            await getAllGames(),
            await getUserWishlist(session?.user.username || ""),
            await getUserRoleByUID(session?.user.id || "")
        ]);

        // Pass data to the client component
        return (
            <div className="pb-14">
                <AllGamesDisplay
                    games={games}
                    userRole={role}
                    uid={session?.user.id || ""}
                    wishlist={wishlist}
                />
            </div>
        );
    } catch (error) {
        console.error("Error fetching data for AllGamesPage:", error);
        return <div>Error loading games. Please try again later.</div>;
    }
}
