import executeQuery from "@/database/mysqldb";
import GameRow from "@/types/models/GameRow";
import blobToBase64 from "@/utils/blobToBase64";
import RawGameRow from "@/types/models/RawGameRow"

export class StoreRepository {
    // Returns a Promise containing an array of GameRow type
    public async getGamesByStoreId(storeId: string): Promise<GameRow[]> {
        const query = `
            SELECT G.gid, 
                G.Title AS title, 
                ROUND(G.Price * (1 - I.Discount), 2) AS price, 
                GP.image,
            GROUP_CONCAT(L.Platform SEPARATOR ', ') AS platforms
            FROM Inventories I 
            LEFT JOIN Games G ON I.gid = G.gid
            LEFT JOIN GamePhotos GP ON GP.gid = G.gid 
            LEFT JOIN Platforms P ON P.gid = G.gid
            LEFT JOIN PlatformList L ON P.plat_id = L.plat_id
            WHERE I.Sid = ? 
            GROUP BY I.gid, G.Price, I.Discount, GP.image;
            `;
        const results = await executeQuery(query, [storeId]) as RawGameRow[];

        if (!Array.isArray(results)) {
            throw new Error("Invalid format");
        }

        const processedResults: GameRow[] = results.map((result) => ({
            ...result,
            image: result.image ? blobToBase64(result.image) : undefined, 
        }));
        return processedResults;
    }
}
