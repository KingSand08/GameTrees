import executeQuery from "@/database/mysqldb";

/**
 * Update user details in the database.
 * @param userId User's ID
 * @param updateData Fields to update
 * @returns Boolean indicating success or failure
 */
export const updateUserDetails = async (userId: number, updateData: Record<string, unknown>): Promise<boolean> => {
    try {
        const fields = Object.keys(updateData)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(updateData);

        const query = `UPDATE Users SET ${fields} WHERE uid = ?`;

        interface QueryResult {
            affectedRows: number;
        }

        // Run the query using executeQuery
        const result = await executeQuery(query, [...values, userId]) as QueryResult;

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating user details:", error);
        return false;
    }
};