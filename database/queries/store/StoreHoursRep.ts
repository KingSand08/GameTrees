import executeQuery from "@/database/mysqldb";
import StoreHours from "@/types/models/StoreHours";

export class StoreHoursRep {
    public async getStoreHours(storeId: string): Promise<StoreHours[]> {
        const query = `
                SELECT  day,
                        DATE_FORMAT(start_time, '%h:%i %p') AS start_time,
                        DATE_FORMAT(end_time, '%h:%i %p') AS end_time 
                FROM StoreHours
                WHERE sid = ?;
        `;
        const result = await executeQuery(query, [storeId]) as StoreHours[];
        return result;
    }
}