import executeQuery from "@/database/mysqldb";
import StoreRow from "@/types/models/StoreRow";

export class AllStores {
    // Returns a Promise containing an array of GameRow type
    public async getAllStoresByGid(game_id: string): Promise<StoreRow[]> {
        const query = `
            SELECT
                S.sid AS store_id,
                S.store_name,
                CONCAT_WS(', ', S.street, S.city, S.state, S.country) AS address,
                CAST(I.discount * 100 AS UNSIGNED) AS discount, 
                CAST(G.price * (1 - I.discount) AS DECIMAL(5,2)) AS price
            FROM Inventories I
            LEFT JOIN Stores S ON S.sid = I.sid
            LEFT JOIN Games G ON G.gid = I.gid
            WHERE I.gid = ?;
            `;
        const results = await executeQuery(query, [game_id]) as StoreRow[];
    
        return results;
    }
}