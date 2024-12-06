import executeQuery from "@/database/mysqldb";

export async function addToStoreInventory(sid: string, gid: string) {
    const query = `
        INSERT INTO Inventories(sid, gid)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE gid = gid;  
    `;

    try {
        // Execute the query
        await executeQuery(query, [sid, gid]);
    } catch (error) {
        console.error("Error adding to store inventory:", error);
    }
}

export async function removeFromStoreInventory(sid: string, gid: string) {
    const query = `
            DELETE FROM Inventories W
            WHERE sid = ? AND gid = ?;
        `;

    try {
        // Execute the query
        await executeQuery(query, [sid, gid]);
    } catch (error) {
        console.error("Error removing from store inventory:", error);
    }
}