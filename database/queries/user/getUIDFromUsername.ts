import executeQuery from "@/database/mysqldb";

/**
 * Get user ID by username.
 * @param username The username to search for
 * @returns User ID or null if not found
 */
export const getUserIdByUsername = async (username: string): Promise<number | null> => {
    try {
        const query = `
            SELECT uid 
            FROM Users 
            WHERE username = ?;
        `;

        const results = await executeQuery(query, [username]) as { uid: number }[];

        if (results.length > 0) {
            return results[0].uid;
        }

        return null;

    } catch (error) {
        console.error("Error fetching user ID by username:", error);
        return null;
    }
};
