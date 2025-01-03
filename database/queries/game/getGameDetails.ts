import executeQuery from "@/database/mysqldb";
import GameDetails from "@/types/models/GameDetails";
import RawGameDetails from "@/types/models/RawGameDetails";

export async function getGamesByID(game_id: string): Promise<GameDetails | undefined> {
    const query = `
       SELECT 
            G.gid,
            G.title,
            G.description,
            B.name AS developer,
            G.price,
            G.publish_date,
            P.image
        FROM Games G
        LEFT JOIN Business B ON G.did = B.bid
        LEFT JOIN GamePhotos P ON P.gid = G.gid
        WHERE G.gid = ?;
    `;

    try {
        const rawResult = await executeQuery(query, [game_id]) as RawGameDetails[];

        const refinedResult = rawResult.map((game) => ({
            ...game,
            image: game.image
                ? `data:image/jpeg;base64,${game.image.toString("base64")}` // Add prefix for base64
                : undefined, // Handle missing images
        }));

        return refinedResult[0];
    } catch (error) {
        console.error("Error fetching Games:", error);
        return undefined;
    }
}
