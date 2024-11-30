import executeQuery from "@/database/mysqldb";
import StoreHours from "@/types/models/StoreHours";

export class StoreHoursRep {
    public async getStoreHours(storeId: string): Promise<StoreHours[]> {
        const query = `
                SELECT * FROM StoreHours
                WHERE sid = ?;
        `;
        const result = await executeQuery(query, [storeId]) as StoreHours[];
        return result;
    }
}