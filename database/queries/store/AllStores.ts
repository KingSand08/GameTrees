import executeQuery from "@/database/mysqldb";

export type Store = {
    id: number;
    name: string;
    city: string;
    state: string;
    address: string;
    opsDays: string;
    opsHours: string;
    modality: string;
};

export class AllStoresRep {
    public async getAllStores(): Promise<Store[]> {
        const query = `
            SELECT 
                sid AS id,
                store_name AS name,
                city,
                state,
                CONCAT_WS(', ', street, city, state, zip, country) AS address,
                ops_days AS opsDays,
                ops_hours AS opsHours,
                modality
            FROM Stores;
        `;

        const result = await executeQuery(query, []) as Store[];
        return result;
    }
}
