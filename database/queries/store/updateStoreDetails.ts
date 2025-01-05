import executeQuery from "@/database/mysqldb";

/**
 * Update store details in the database.
 * @param storeId Store's ID
 * @param updateData Fields to update
 * @returns Boolean indicating success or failure
 */
export const updateStoreDetails = async (storeId: number, updateData: Record<string, unknown>): Promise<boolean> => {
    try {
        const fields = Object.keys(updateData)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(updateData);

        const query = `UPDATE Stores SET ${fields} WHERE sid = ?`;

        interface QueryResult {
            affectedRows: number;
        }

        // Run the query using executeQuery
        const result = await executeQuery(query, [...values, storeId]) as QueryResult;

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating store details:", error);
        return false;
    }
};