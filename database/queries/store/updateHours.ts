import executeQuery from "@/database/mysqldb";

/**
 * Update user details in the database.
 * @param storeId Store's ID
 * @param updateData Fields to update
 * @returns Boolean indicating success or failure
 */
export const updateHours = async (storeId: number, day: string, updateData: Record<string, unknown>): Promise<boolean> => {
    try {
        interface QueryResult {
            affectedRows: number;
        }
        
        const values = Object.values(updateData);

        const query = `
            INSERT INTO StoreHours(start_time, end_time, day, sid)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                start_time = VALUES(start_time),
                end_time = VALUES(end_time);
        `
               
        const result = await executeQuery(query, [...values, day, storeId]) as QueryResult;
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating store details:", error);
        return false;
    }
};