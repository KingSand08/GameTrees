import executeQuery from "@/database/mysqldb";

export async function getUserAccountImage(uid: string | number): Promise<string | null> {
    const query = `
        SELECT
            AP.image
        FROM
            Users U
        JOIN
            AccPhotos AP ON U.uid = AP.uid
        WHERE
            U.uid = ?;
    `;
    const values = [uid];

    try {
        const result = await executeQuery(query, values) as { image?: Buffer }[];

        if (result.length > 0 && result[0].image) {
            return `data:image/jpeg;base64,${result[0].image.toString("base64")}`;
        }

        return null;
    } catch (error) {
        console.error("Error fetching user profile image:", error);
        return null;
    }
}
