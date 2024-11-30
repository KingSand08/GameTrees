import executeQuery from "@/database/mysqldb";
import StoreDetails from "@/types/models/StoreDetail";

export class StoreDetailRep {
    public async getStoreDetails(storeId: string): Promise<StoreDetails> {
        const query = `
            SELECT  S.store_name AS name, S.modality, 
                    CONCAT_WS(', ', Street, City, State, Zip, Country) AS address
            FROM Stores S
            WHERE sid = ?;
        `;
        const result = await executeQuery(query, [storeId]) as StoreDetails[];
        return result[0];
    }
}