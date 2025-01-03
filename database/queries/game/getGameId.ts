import executeQuery from "@/database/mysqldb";

export async function getGameId(title: string): Promise<number | null> {
    try {
        const query = `
            SELECT gid
            FROM Games
            WHERE title = ?;
        `;

        const result = await executeQuery(query, [title]) as number;

        return result;
    } catch (error) {
        console.error("Error fetching Game Id (gid):", error);
        return null;
    }
}
