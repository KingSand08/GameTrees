import executeQuery from "@/database/mysqldb";

export async function getUserAccountImage(userId: number): Promise<string | null> {
    const query = `
        SELECT
            P.Image
        FROM
            Users U
        JOIN
            Acc_Photos AP ON U.UID = AP.UID
        JOIN
            Photos P ON AP.Photo_ID = P.Photo_ID
        WHERE
            U.UID = ?;
    `;
    const values = [userId];

    try {
        const result = await executeQuery(query, values) as { Image?: Buffer }[];

        if (result.length > 0 && result[0].Image) {
            return `data:image/jpeg;base64,${result[0].Image.toString("base64")}`;
        }

        return null;
    } catch (error) {
        console.error("Error fetching user profile image:", error);
        return null;
    }
}
