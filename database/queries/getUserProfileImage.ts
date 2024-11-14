import executeQuery from "@/database/mysqldb";

export async function getUserProfileImage(username: string): Promise<string | null> {
    const query = `SELECT Image FROM Users WHERE Username = ? LIMIT 1`;
    const values = [username];

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
