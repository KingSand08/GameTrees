import executeQuery from "@/database/mysqldb";

/**
 * Get user ID by username.
 * @param username The username to search for
 * @returns User ID or null if not found
 */
export const getUserIdByUsername = async (username: string): Promise<number | null> => {
    try {
        const query = `
            SELECT UID 
            FROM Users 
            WHERE Username = ?;
        `;

        interface QueryResult {
            UID: number;
        }

        // Run the query using executeQuery
        const results = await executeQuery(query, [username]) as QueryResult[];

        return results.length > 0 ? results[0].UID : null;
    } catch (error) {
        console.error("Error fetching user ID by username:", error);
        return null;
    }
};
