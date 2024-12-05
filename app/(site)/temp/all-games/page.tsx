import React from "react";
import { getAllGames } from "@/database/queries/game/getAllGames";
import { getUserWishlist } from "@/database/queries/wishlist/getWishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";
import AllGamesClient from "./AllGamesClient";

export default async function AllGamesPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return <div>Please log in to view games.</div>;
    }

    try {
        const [games, wishlist, userRole] = await Promise.all([
            getAllGames(),
            getUserWishlist(session.user.username),
            getUserRoleByUID(session.user.id),
        ]);

        return (
            <AllGamesClient
                games={games}
                wishlist={wishlist}
                userRole={userRole}
                uid={session.user.id}
            />
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading games. Please try again later.</div>;
    }
}
