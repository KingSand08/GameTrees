import executeQuery from "@/database/mysqldb";
import GameRow from "@/types/models/GameRow";

export class StoreRepository {
    // Returns a Promise containing an array of GameRow type
    public async getGamesByStoreId(storeId: string): Promise<GameRow[]> {
        const query = `
            SELECT 
                G.title, 
                ROUND(G.price * (1 - COALESCE(I.discount, 0)), 2) AS price,
                GP.image,
                (
                    SELECT GROUP_CONCAT(L.Platform SEPARATOR ', ')
                    FROM Platforms P
                    INNER JOIN PlatformList L ON P.plat_id = L.plat_id
                    WHERE P.gid = G.gid
                ) AS platforms
            FROM Inventories I
            LEFT JOIN Games G ON I.gid = G.gid
            LEFT JOIN GamePhotos GP ON GP.gid = G.gid 
            WHERE I.Sid = 1 
            GROUP BY G.gid, GP.image, I.discount;
            `;
        const results = await executeQuery(query, [storeId]) as GameRow[];
        return results;
    }
}
