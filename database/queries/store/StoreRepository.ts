import executeQuery from "@/database/mysqldb";
import GameRow from "@/types/models/GameRow";

export class StoreRepository {
    // Returns a Promise containing an array of GameRow type
    public async getGamesByStoreId(storeId: string): Promise<GameRow[]> {
        const query = `
            SELECT G.Title AS title, 
                ROUND(G.Price * (1 - I.Discount), 2) AS price, 
                GP.image,
            GROUP_CONCAT(L.Platform SEPARATOR ', ') AS platforms
            FROM Inventories I 
            LEFT JOIN Games G ON I.gid = G.gid
            LEFT JOIN GamePhotos GP ON GP.gid = G.gid 
            WHERE I.Sid = 1 
            GROUP BY I.gid, G.Price, I.Discount, GP.image;
            `;
        const results = await executeQuery(query, [storeId]) as GameRow[];
        return results;
    }
}
