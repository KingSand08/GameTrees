import executeQuery from "@/database/mysqldb";
import StoreDetails from "@/types/models/StoreDetail";

export class StoreDetailRep {
    public async getStoreDetails(storeId: string): Promise<StoreDetails> {
        const query = `
            SELECT Ops_Hours AS opsHour,
                CONCAT_WS(', ', Street, City, State, Zip, Country) AS address
            FROM Stores
            WHERE sid = ?;
        `;
        const result = await executeQuery(query, [storeId]) as StoreDetails[];
        return result[0];
    }
}