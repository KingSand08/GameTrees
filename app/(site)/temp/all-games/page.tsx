import React from "react";
import AllGamesClient from "./AllGamesClient";
import { getAllGames } from "@/database/queries/game/getAllGames";
import { getUserWishlist } from "@/database/queries/wishlist/getWishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";

export default async function AllGamesPage() {
    const session = await getServerSession(authOptions);

    try {

        const [games, wishlist, userRole] = await Promise.all([
            getAllGames(),
            getUserWishlist(session?.user.username || ""), 
            getUserRoleByUID(session?.user.id || "guest"), 
        ]);

        return (
            <AllGamesClient
                games={games}
                wishlist={wishlist}
                userRole={userRole}
                uid={session?.user.id || ""} 
            />
        );
    } catch (error) {
        console.error("Error fetching data for AllGamesPage:", error);
        return <div>Error loading games. Please try again later.</div>;
    }
}
