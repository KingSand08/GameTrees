import executeQuery from "@/database/mysqldb";
import RawGameDetails from "@/types/models/RawGameDetails";

export async function editGame(gid: string, description?: string, price?: string | number, image?: string | Buffer,) {
    // If description
    const descQquery = `
    INSERT INTO Games (gid, description)
            VALUES (?, ?);
    `;

    // If price
    const priceQquery = `
    INSERT INTO Games (gid, did, price)
            VALUES (?, ?);
    `;

    // If image
    const imageQquery = `
    INSERT INTO GamesPhotos (gpid, )
            VALUES (?, ?);
    `;

    try {
        const rawResult = await executeQuery(query, [gid]) as RawGameDetails[];

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
