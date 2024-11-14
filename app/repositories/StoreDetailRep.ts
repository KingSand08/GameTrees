import executeQuery from "@/database/mysqldb";
import StoreDetails from "@/types/models/StoreDetail";

export class StoreDetailRep {
    public async getStoreDetails(storeId: string): Promise<StoreDetails> {
        const query = `
            SELECT Ops_Hour AS opsHour,
            CONCAT_WS(', ', Street, City, State, Zip_Code, Country) AS address
            FROM Stores
            WHERE Store_ID = ?;
        `;
        const result = await executeQuery(query, [storeId]) as StoreDetails[];
        return result[0];
    }
}