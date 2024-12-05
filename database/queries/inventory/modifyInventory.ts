/*import executeQuery from "@/database/mysqldb";

export async function addToStoreInv(sid: number, gid: number, discount:number) {
    const query = `
        INSERT INTO Inventories (sid, gid, discount)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE gid = gid;
    `;
    try {
        // Execute the query
        await executeQuery(query, [sid, gid, discount]);
    } catch (error) {
        console.error("Error adding game to inventory:", error);
    }
}

export async function removeFromStoreInv(sid: number, gid: number) {
    const query = `
            DELETE FROM Inventories I
            WHERE sid = ? AND gid = ?;
        `;

    try {
        // Execute the query
        await executeQuery(query, [sid, gid]);
    } catch (error) {
        console.error("Error removing from store inventory:", error);
    }
}
*/