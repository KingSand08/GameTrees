import executeQuery from "@/database/mysqldb";

type GameInfo = {
    title: string;
    publish_date: string;
};

export async function getPrimaryGameInfo(gid: number): Promise<GameInfo | null> {
    try {
        const query = `
            SELECT title, publish_date
            FROM Games
            WHERE gid = ?;
        `;

        // Use a type assertion or generics to specify the type of the result
        const results = (await executeQuery(query, [gid])) as GameInfo[];

        if (results.length === 0) {
            return null; // Game not found
        }

        return results[0]; // Return the first result as GameInfo
    } catch (error) {
        console.error("Error fetching game info by gid:", error);
        throw new Error("Failed to fetch game information.");
    }
}
