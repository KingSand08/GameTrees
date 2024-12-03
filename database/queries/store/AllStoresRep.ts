import executeQuery from "@/database/mysqldb";
import Stores from "@/types/models/Stores";

export class AllStoresRep {
    public async getAllStores(): Promise<Stores[]> {
        const query = `
            SELECT  sid AS id,
                    store_name AS name,
                    modality,
                    street,
                    city,
                    state,
                    zip,
                    country
            FROM Stores;
        `;
        const result = await executeQuery(query, []) as Stores[];
        return result;
    }
}

