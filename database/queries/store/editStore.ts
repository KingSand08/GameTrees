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

export async function addGameToStores(gameIds: number[], storeIds: number[]) {
    const pairElementsArray = storeIds.map((storeId) => gameIds.flatMap((gameId) => [gameId, storeId]));
    const flatValues = pairElementsArray.flat();
    const totalPairs = storeIds.length * gameIds.length;
    const placeholders = Array(totalPairs).fill("(?, ?)").join(", ");
    const query = `
        INSERT IGNORE INTO Inventories(sid, gid)
        VALUES ${placeholders};
        `;

    try {
        // Execute the query
        await executeQuery(query, [...flatValues]);
    } catch (error) {
        console.error("Error adding games to store list:", error);
    }
}

// storeData = [name, street, city, state, zip, country, modality, bizId]
export async function createStore(updateData: Record<string, unknown>) {
    const fields = Object.keys(updateData)
        .map((key) => `${key}`).join(", ");
    const placeholders = Object.keys(updateData)
        .map(() => ` ?`).join(", ");
    const values = Object.values(updateData);
    // console.log(fields);
    // console.log(placeholders);
    // console.log(values);

    const query = `
        INSERT INTO Stores(${fields})
        VALUES (${placeholders});
        `;

    try {
        // Execute the query
        await executeQuery(query, [...values]);
    } catch (error) {
        console.error("Error adding games to store list:", error);
    }
}