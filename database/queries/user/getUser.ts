import executeQuery from "@/database/mysqldb";
import Game from "@/types/models/Game";
import RawUser from "@/types/models/RawUser";
import User from "@/types/models/User";
import blobToBase64 from "@/utils/blobToBase64";

export async function getUser(uid: string | number): Promise<User | null> {
    const query = `
        SELECT
            U.uid,
            U.username,
            U.firstname AS name,
            U.lastname,
            U.email,
            U.phone,
            U.dob,
            AP.image
        FROM Users U
        LEFT JOIN AccPhotos AP ON U.uid = AP.uid
        WHERE U.uid = ?;
        `;

    try {
        // Execute query and retrieve raw results
        const rawResult = await executeQuery(query, [uid]) as RawUser[];

        // Ensure we only process the first result
        if (rawResult.length === 0) {
            return null; // No user found
        }

        const user = rawResult[0];

        // Convert blob image to Base64 and construct the User object
        const refinedResult: User = {
            ...user,
            image: user.image ? blobToBase64(user.image) : null,
        };

        return refinedResult;
    } catch (error) {
        console.error("Error fetching Games:", error);
        return null;
    }
}
