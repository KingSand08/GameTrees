import blobToBase64 from "@/utils/blobToBase64";
import executeQuery from "@/database/mysqldb";
import StoreRow from "@/types/models/StoreRow";
import RawStoreRow from "@/types/models/RawStoreRow";

export async function getStoreByMid(managerId: number | null): Promise<StoreRow[]> {
    const query = `
        SELECT 
            S.sid AS store_id,
            S.store_name AS store_name,
            CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
            S.modality,
            COUNT(I.gid) AS available,
            (   SELECT P.image
                FROM StorePhotos P
                WHERE P.sid = S.sid
                LIMIT 1
            ) AS image
            FROM Stores S
            LEFT JOIN Inventories I ON I.sid = S.sid
            WHERE S.mid = ?
            GROUP BY (S.sid)
            ORDER BY available DESC;
        `;

    // Execute the query
    const results = (await executeQuery(query, [managerId])) as RawStoreRow[];


    if (!Array.isArray(results)) {
        // console.error("Query returned non-array results:", results);
        throw new Error("Invalid data format returned from the database.");
    }

    // Convert images to Base64
    const processedResults: StoreRow[] = results.map((result) => ({
        ...result,
        image: result.image ? blobToBase64(result.image) : undefined, // Convert Buffer to Base64
    }));

    return processedResults;
}

export async function getUnclaimedStores(): Promise<StoreRow[]> {
    const query = `
        SELECT 
            S.sid AS store_id,
            S.store_name AS store_name,
            CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
            S.modality,
            COUNT(I.gid) AS available,
            (   SELECT P.image
                FROM StorePhotos P
                WHERE P.sid = S.sid
                LIMIT 1
            ) AS image
            FROM Stores S
            LEFT JOIN Inventories I ON I.sid = S.sid
            WHERE S.mid IS NULL
            GROUP BY (S.sid)
            ORDER BY available DESC;
        `;

    // Execute the query
    const results = (await executeQuery(query, [])) as RawStoreRow[];


    if (!Array.isArray(results)) {
        throw new Error("Invalid data format returned from the database.");
    }

    // Convert images to Base64
    const processedResults: StoreRow[] = results.map((result) => ({
        ...result,
        image: result.image ? blobToBase64(result.image) : undefined, // Convert Buffer to Base64
    }));

    return processedResults;
}

