import executeQuery from "@/database/mysqldb";
import RawTrendGame from "@/types/models/RawTrendGame";
import TrendGame from "@/types/models/TrendGame";

export async function getTrendingGames(): Promise<TrendGame[]> {
    const query = `
        SELECT
            G.gid,
            G.title,
            GROUP_CONCAT(DISTINCT GL.type) AS genre,
            MIN(CAST(G.price * (1 - I.discount) AS DECIMAL(5,2))) AS lowestPrice,
            COUNT(DISTINCT W.uid) AS wishlistCount,
            MAX(P.image) AS image
        FROM Games G
        LEFT JOIN Wishlists W ON G.gid = W.gid
        LEFT JOIN Genres GE ON G.gid = GE.gid
        LEFT JOIN GenreList GL ON GE.genre_id = GL.genre_id
        LEFT JOIN Inventories I ON G.gid = I.gid
        LEFT JOIN GamePhotos P ON P.gid = G.gid
        GROUP BY G.gid, G.title
        ORDER BY wishlistCount DESC
        LIMIT 10;
    `;

    try {
        const rawResult = await executeQuery(query, []) as RawTrendGame[];

        const refinedResult = rawResult.map((game) => ({
            ...game,
            image: game.image
                ? `data:image/jpeg;base64,${game.image.toString("base64")}` // Add prefix for base64
                : undefined, // Handle missing images
        }));

        return refinedResult;
    } catch (error) {
        console.error("Error fetching Games:", error);
        return [];
    }
}
