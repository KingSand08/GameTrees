import executeQuery from "@/database/mysqldb";
import { getPrimaryGameInfo } from "./getPrimaryGameInfo";
import { addGameCoverImage } from "../photo/addGameImage";

export async function editGame(
    gid: string | number,
    description?: string,
    price?: string | number,
    image?: string | Buffer
): Promise<{ status: string; message: string }> {
    try {
        // If description
        if (description) {
            const descQquery = `
            INSERT INTO Games (gid, description)
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE description = VALUES(description);
        `;
            await executeQuery(descQquery, [gid, description]);
        }

        // If price
        if (price) {
            const priceQquery = `
            INSERT INTO Games (gid, price)
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE price = VALUES(price);
        `;
            await executeQuery(priceQquery, [gid, price]);
        }

        // If image
        if (image) {
            // Fetch game info to get title and publish_date
            const gameInfo = await getPrimaryGameInfo(gid as number);

            if (!gameInfo) {
                throw new Error("Game not found for the provided gid.");
            }

            const { title, publish_date } = gameInfo;

            // Use the addGameCoverImage query to handle image insertion/update
            const coverImageResult = await addGameCoverImage({
                gid: Number(gid),
                photo: Buffer.from(image),
                title,
                publish_date,
            });

            if (coverImageResult.status === "error") {
                throw new Error(coverImageResult.message);
            }
        }

        return { status: "success", message: "Game updated successfully." };
    } catch (error) {
        console.error("Error fetching Games:", error);
        return { status: "error", message: "Failed to edit the game." };
    }
}
