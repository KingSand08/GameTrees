import executeQuery from "@/database/mysqldb";
import blobToBase64 from "@/utils/blobToBase64";

interface StoreData {
    id: number;
    name: string;
    address: string;
    modality: string;
    city: string;
    day: string;
    start_time: string;
    end_time: string;
    image: Buffer;
}

export type StoreHours = {
    day: string; // E.g., "Monday", "Tuesday"
    start_time: string; // E.g., "10:00:00"
    end_time: string; // E.g., "20:00:00"
};

export type Store = {
    id: number;
    name: string;
    address: string;
    modality: string;
    city: string;
    hours: StoreHours[]; // Array of operating hours
    image?: string;
};

export type QueryResultRow = {
    id: number;          // Store ID
    name: string;        // Store name
    address: string;     // Concatenated address
    modality: string;    // Store modality
    city: string;        // Store city
    day?: string;        // Day of operation (optional, because LEFT JOIN may result in null)
    start_time?: string;  // Start time in formatted string (optional)
    end_time?: string;    // End time in formatted string (optional)
};

export class SeparateStoresRep {
    private bayAreaCities = [
        "San Francisco", "Mountain View", "Palo Alto", "Berkeley",
        "San Jose", "Oakland", "Fremont", "Burlingame",
        "Redwood City", "Santa Clara"
    ];

    private async getStoresByCities(cities: string[], isBayArea: boolean): Promise<Store[]> {
        const query = `
            SELECT 
                S.sid AS id,
                S.store_name AS name,
                CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
                S.modality,
                S.city,
                SH.day,
                DATE_FORMAT(SH.start_time, '%h:%i %p') AS start_time,
                DATE_FORMAT(SH.end_time, '%h:%i %p') AS end_time,
                (   SELECT P.image
                    FROM StorePhotos P
                    WHERE P.sid = S.sid
                    LIMIT 1
                ) AS image
            FROM Stores S
            LEFT JOIN StoreHours SH ON S.sid = SH.sid
            WHERE S.city ${isBayArea ? "IN" : "NOT IN"} (${cities.map(() => '?').join(', ')})
            ORDER BY S.sid, FIELD(SH.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
            LIMIT 65
        `;
        const result = await executeQuery(query, cities) as StoreData[];

        // Group rows into stores with hours
        return result.reduce((stores: Store[], row) => {
            const existingStore = stores.find(store => store.id === row.id);
            const hours: StoreHours = {
                day: row.day,
                start_time: row.start_time,
                end_time: row.end_time
            };

            if (existingStore) {
                existingStore.hours.push(hours);
            } else {
                stores.push({
                    id: row.id,
                    name: row.name,
                    address: row.address,
                    modality: row.modality,
                    city: row.city,
                    hours: row.day ? [hours] : [], // Only include hours if they exist
                    image: row.image ? blobToBase64(row.image) : undefined,
                });
            }

            return stores;
        }, []);
    }

    public async getBayAreaStores(): Promise<Store[]> {
        return this.getStoresByCities(this.bayAreaCities, true);
    }

    public async getNonBayAreaStores(): Promise<Store[]> {
        return this.getStoresByCities(this.bayAreaCities, false);
    }
}
