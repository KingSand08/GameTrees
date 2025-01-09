import executeQuery from "@/database/mysqldb";
import GameRow from "@/types/models/GameRow";
import blobToBase64 from "@/utils/blobToBase64";
import RawGameRow from "@/types/models/RawGameRow"

export class StoreRepository {
    // Returns a Promise containing an array of GameRow type
    public async getGamesByStoreId(storeId: string): Promise<GameRow[]> {
        const query = `
            SELECT
                G.gid,
                MAX(G.Title) AS title,
                ROUND(MAX(G.Price) * (1 - MAX(I.discount)), 2) AS price,
                MAX(GP.image) AS image,
                GROUP_CONCAT(DISTINCT L.Platform SEPARATOR ', ') AS platforms,
                CAST(MAX(I.discount) * 100 AS UNSIGNED) AS discount
            FROM Inventories I
            LEFT JOIN Games G ON I.gid = G.gid
            LEFT JOIN GamePhotos GP ON GP.gid = G.gid
            LEFT JOIN Platforms P ON P.gid = G.gid
            LEFT JOIN PlatformList L ON P.plat_id = L.plat_id
            WHERE I.Sid = ?
            GROUP BY G.gid;
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