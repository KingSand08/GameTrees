import executeQuery from "@/database/mysqldb";

export const getManagerIdFromStoreId = async (storeId: string): Promise<number | null> => {
    try {
        const query = `
            SELECT mid 
            FROM Stores 
            WHERE sid = ?;
        `;

        const results = await executeQuery(query, [storeId]) as { mid: number }[];

        if (results.length > 0) {
            return results[0].mid;
        }

        return null;

    } catch (error) {
        console.error("Error fetching manager ID by store ID:", error);
        return null;
    }
};