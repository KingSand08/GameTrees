import executeQuery from "@/database/mysqldb";
import GameRow from "@/types/models/GameRow";

export class StoreRepository {
    // Returns a Promise containing an array of GameRow type
    public async getGamesByStoreId(storeId: string): Promise<GameRow[]> {
        const query = `
            SELECT G.Title AS title, 
            ROUND(G.Price * (1 - I.Discount), 2) AS price, 
            GROUP_CONCAT(L.Platform SEPARATOR ', ') AS platforms
            FROM Inventories I 
            LEFT JOIN Games G ON I.gid = G.gid 
            LEFT JOIN Platforms P ON P.gid = G.gid
            LEFT JOIN Platform_list L ON P.Platform_ID = L.Platform_ID 
            WHERE I.Store_ID = ? 
            GROUP BY I.gid, G.Price, I.Discount;`;
        const results = await executeQuery(query, [storeId]) as GameRow[];
        return results;
    }
}
