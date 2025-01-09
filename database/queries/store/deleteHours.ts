import executeQuery from "@/database/mysqldb";

/**
 * Delete the operating hours in the database.
 * @param days - The array of days.
 */
export async function deleteHours(days: string[], storeId: number): Promise<void> {
    try {
        const placeholders = days.map(() => "?").join(", ");
        
        const deleteQuery = `
            DELETE FROM StoreHours
            WHERE day IN (${placeholders}) AND sid = ?;
        `;

        await executeQuery(deleteQuery, [...days, storeId]);
    }
    catch (error) {
        console.error("Error deleting hours:", error);
        throw error;
    }
}

export default deleteHours;