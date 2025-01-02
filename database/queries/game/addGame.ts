import executeQuery from "@/database/mysqldb";
import { addGameCoverImage } from "@/database/queries/photo/addGameImage";
import Game from "@/types/models/Game";

type GameInsertData = {
    title: string;
    description: string;
    did: number;
    price: number;
    publishDate: string;
    photo: Buffer;
};

const addGame = async (gameData: GameInsertData): Promise<{ status: string; message: string }> => {
    const { title, description, did, price, publishDate, photo } = gameData;

    try {
        // Step 1: Insert the game into the games table
        const gameInsertQuery = `
            INSERT INTO Games (title, description, did, price, publish_date) 
            VALUES (?, ?, ?, ?, ?)
        `;
        await executeQuery(gameInsertQuery, [title, description, did, price, publishDate]);

        // Step 2: Retrieve the inserted game
        const getGameQuery = `
            SELECT * FROM Games
            WHERE title = ? AND did = ? AND publish_date = ?;
        `;
        const gameResults = await executeQuery(getGameQuery, [title, did, publishDate]) as Game[];

        // Check if the query returned results
        if (!gameResults || gameResults.length === 0) {
            throw new Error("Failed to retrieve the game after insertion.");
        }

        // Step 3: Use the first result as the game object
        const game: Game = gameResults[0]; // TypeScript now knows this is a Game object

        // Step 4: Add the game photo using addGameCoverImage
        await addGameCoverImage(game, photo);

        return { status: "success", message: "Game and its cover photo inserted successfully!" };
    } catch (error) {
        console.error("Error inserting game and photo:", error);
        return { status: "error", message: "An unexpected error occurred while inserting the game and its photo." };
    }
};

export default addGame;
