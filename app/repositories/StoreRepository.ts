import StoreDetails from "@/types/models/StoreDetail";
import Database from "../../database/Database";
import GameRow from "../../types/models/GameRow";

export class StoreRepository {
    // eturns a Promise containing an array of GameRow type
    public async getGamesByStoreId(storeId: string): Promise<GameRow[]> {
        const query = `
            SELECT I.Title AS title, 
            ROUND(G.Price * (1 - I.Discount), 2) AS price, 
            GROUP_CONCAT(L.Platform SEPARATOR ', ') AS platforms
            FROM Inventories I 
            LEFT JOIN Games G ON I.Title = G.Title AND I.Dev_ID = G.Dev_ID 
            LEFT JOIN Platforms P ON P.Title = G.Title AND P.Dev_ID = G.Dev_ID
            LEFT JOIN Platform_list L ON P.Platform_ID = L.Platform_ID 
            WHERE I.Store_ID = ? 
            GROUP BY I.Title, G.Price, I.Discount;`;
        const results = await Database.getInstance().executeQuery(query, [storeId]) as GameRow[];
        return results;
    }
}
