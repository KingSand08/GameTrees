import executeQuery from "@/database/mysqldb";
import StoreDetails from "@/types/models/StoreDetail";

export class StoreDetailRep {
    public async getStoreDetails(storeId: string): Promise<StoreDetails | undefined> {
        const query = `
            SELECT  S.store_name AS name, 
                    S.modality, 
                    S.street, 
                    S.city, 
                    S.state, 
                    S.zip AS zipCode, 
                    S.country
            FROM Stores S
            WHERE S.sid = ?;
        `;

        const result = await executeQuery(query, [storeId]) as StoreDetails[];
        return result[0]
    }
}