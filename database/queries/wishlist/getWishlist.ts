import blobToBase64 from "@/utils/blobToBase64";
import executeQuery from "@/database/mysqldb";
import WishlistRow from "@/types/models/WishlistRow";
import RawWishlistRow from "@/types/models/RawWishlistRow";


export async function getUserWishlist(username: string): Promise<WishlistRow[]> {
    const query = `
            SELECT
                G.gid,
                G.title AS title,
                B.name AS developer,
                P.image AS image,
                G.price AS price
            FROM
                Wishlists W
            LEFT JOIN
                Games G ON W.gid = G.gid
            LEFT JOIN
                Business B ON G.did = B.bid
            LEFT JOIN
                GamePhotos P ON G.gid = P.gid
            WHERE
                W.uid = (SELECT U.uid FROM Users U WHERE U.username = ?);
        `;

    // Execute the query
    const results = (await executeQuery(query, [username])) as RawWishlistRow[];


    if (!Array.isArray(results)) {
        // console.error("Query returned non-array results:", results);
        throw new Error("Invalid data format returned from the database.");
    }

    // Convert images to Base64
    const processedResults: WishlistRow[] = results.map((result) => ({
        ...result,
        image: result.image ? blobToBase64(result.image) : undefined, // Convert Buffer to Base64
    }));

    return processedResults;
}

export default getUserWishlist;