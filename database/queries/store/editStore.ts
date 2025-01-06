import executeQuery from "@/database/mysqldb";

export async function removeManagerIdInStores(storeIds: number[], managerId: number) {
    const placeholders = storeIds.map(() => "?").join(", ");
    const query = `
            UPDATE Stores S
            SET S.mid = NULL
            WHERE S.sid IN (${placeholders}) AND S.mid = ?;
        `;

    try {
        // Execute the query
        await executeQuery(query, [...storeIds, managerId]);
    } catch (error) {
        console.error("Error removing manager ID from store list:", error);
    }
}

export async function updateManagerIdInStores(storeIds: number[], managerId: number) {
    const placeholders = storeIds.map(() => "?").join(", ");
    const query = `
            UPDATE Stores S
            SET S.mid = ?
            WHERE S.sid IN (${placeholders});
        `;

    try {
        // Execute the query
        await executeQuery(query, [managerId, ...storeIds]);
    } catch (error) {
        console.error("Error adding manager ID to store list:", error);
    }
}