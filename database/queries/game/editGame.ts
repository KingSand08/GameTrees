import executeQuery from "@/database/mysqldb";
import { getPrimaryGameInfo } from "./getPrimaryGameInfo";
import { addGameCoverImage } from "../photo/addGameImage";
import Game from "@/types/models/Game";

export async function editGame(
    gid: string | number,
    description?: string | null,
    price?: string | number | null,
    image?: string | Buffer | null,
): Promise<{ status: string; message: string }> {
    try {
        // Fetch game info to get title and publish_date
        const gameInfo = await getPrimaryGameInfo(gid as number);

        if (!gameInfo) {
            throw new Error("Game not found for the provided gid.");
        }

        const { title, publish_date } = gameInfo;


        // If description
        if (description) {
            const descQuery = `
            INSERT INTO Games (gid, title, description)
                    VALUES (?, ?, ?)
                    ON DUPLICATE KEY UPDATE description = VALUES(description);
        `;
            await executeQuery(descQuery, [gid, title, description]);
        }

        // If price
        if (price) {
            const priceQuery = `
            INSERT INTO Games (gid, title, price)
                    VALUES (?, ?, ?)
                    ON DUPLICATE KEY UPDATE price = VALUES(price);
        `;
            await executeQuery(priceQuery, [gid, title, price]);
        }

        // If image
        if (image) {
            // Use the addGameCoverImage query to handle image insertion/update
            const coverImageResult = await addGameCoverImage(
                {
                    gid: Number(gid),
                    title: title,
                    publish_date: publish_date,
                } as Game,
                Buffer.from(image)
            );

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
