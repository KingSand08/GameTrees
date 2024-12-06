import executeQuery from "@/database/mysqldb";

export async function editGame(
    gid: string,
    description?: string,
    price?: string | number,
    image?: string | Buffer
): Promise<{ status: string; message: string }> {
    try {
        // If description
        if (description) {
            const descQquery = `
            INSERT INTO Games (gid, description)
                    VALUES (?, ?);
                    ON DUPLICATE KEY UPDATE description = VALUES(description);
        `;
            await executeQuery(descQquery, [gid, description]);
        }

        // If price
        if (price) {
            const priceQquery = `
            INSERT INTO Games (gid, price)
                    VALUES (?, ?);
                    ON DUPLICATE KEY UPDATE price = VALUES(price);
        `;
            await executeQuery(priceQquery, [gid, price]);
        }

        // If image
        if (image) {
            const imageQquery = `
            INSERT INTO GamePhotos (gid, image)
                    VALUES (?, ?);
                    ON DUPLICATE KEY UPDATE image = VALUES(image);
        `;
            await executeQuery(imageQquery, [gid, image]);
        }

        return { status: "success", message: "Game updated successfully." };
    } catch (error) {
        console.error("Error fetching Games:", error);
        return { status: "error", message: "Failed to edit the game." };
    }
}
