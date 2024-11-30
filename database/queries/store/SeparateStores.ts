import executeQuery from "@/database/mysqldb";

export type Store = {
    id: number;
    name: string;
    address: string;
    opsDays: string;
    opsHours: string;
    modality: string;
    city: string;
};

export class SeparateStoresRep {
    private bayAreaCities = [
        "San Francisco", "Mountain View", "Palo Alto", "Berkeley",
        "San Jose", "Oakland", "Fremont", "Burlingame",
        "Redwood City", "Santa Clara"
    ];

    public async getBayAreaStores(): Promise<Store[]> {
        const query = `
            SELECT 
                sid AS id,
                store_name AS name,
                CONCAT_WS(', ', street, city, state, zip, country) AS address,
                ops_days AS opsDays,
                ops_hours AS opsHours,
                modality,
                city
            FROM Stores
            WHERE city IN (${this.bayAreaCities.map(() => '?').join(', ')})
        `;
        const result = await executeQuery(query, this.bayAreaCities) as Store[];
        return result;
    }

    public async getNonBayAreaStores(): Promise<Store[]> {
        const query = `
            SELECT 
                sid AS id,
                store_name AS name,
                CONCAT_WS(', ', street, city, state, zip, country) AS address,
                ops_days AS opsDays,
                ops_hours AS opsHours,
                modality,
                city
            FROM Stores
            WHERE city NOT IN (${this.bayAreaCities.map(() => '?').join(', ')})
        `;
        const result = await executeQuery(query, this.bayAreaCities) as Store[];
        return result;
    }
}
