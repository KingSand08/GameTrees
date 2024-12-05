/*import executeQuery from "@/database/mysqldb";
import InventoryRow from "@/types/models/InventoryRow";


export async function getStoreInventory(sid: string): Promise<InventoryRow[]> {
    const query = `
            SELECT
                G.gid,
                G.title AS title,
                B.name AS developer,
                P.image AS image,
                G.price AS price
            FROM
                Inventories I
            LEFT JOIN
                Games G ON I.gid = G.gid
            LEFT JOIN
                Business B ON G.did = B.bid
            LEFT JOIN
                GamePhotos P ON G.gid = P.gid
            WHERE
                I.sid = ?;
        `;

    // Execute the query
    const results = (await executeQuery(query, [sid])) as InventoryRow[];


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

export default getStoreInventory;
*/