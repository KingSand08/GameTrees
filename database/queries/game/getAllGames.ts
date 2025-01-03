import executeQuery from "@/database/mysqldb";
import Game from "@/types/models/Game";
import RawGame from "@/types/models/RawGame";

export async function getAllGames(): Promise<Game[]> {
    const query = `
        SELECT
            G.gid,
            G.title,
            G.description,
            G.did,
            G.price,
            G.publish_date,
            B.name as developer,
            GP.image
        FROM
            Games G
        LEFT JOIN
            Business B ON G.did = B.bid
        LEFT JOIN
            GamePhotos GP ON G.gid = GP.gid;
    `;

    try {
        const rawResult = await executeQuery(query, []) as RawGame[];

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
