import executeQuery from "@/database/mysqldb";

export async function addToUserWishlist(uid: string, gid: string) {
    const query = `
        INSERT INTO Wishlists (uid, gid)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE gid = gid;
    `;

    try {
        // Execute the query
        await executeQuery(query, [uid, gid]);
    } catch (error) {
        console.error("Error adding to user wishlist:", error);
    }
}

export async function removeFromUserWishlist(uid: string, gid: string) {
    const query = `
            DELETE FROM Wishlists W
            WHERE uid = ? AND gid = ?;
        `;

    try {
        // Execute the query
        await executeQuery(query, [uid, gid]);
    } catch (error) {
        console.error("Error removing from user wishlist:", error);
    }
}