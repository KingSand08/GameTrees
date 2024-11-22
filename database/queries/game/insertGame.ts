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


const insertGame = async (gameData: GameInsertData): Promise<{ status: string; message: string }> => {
    const { title, description, did, price, publishDate, photo } = gameData;

    try {
        // Step 1: Insert the game into the games table
        const gameInsertQuery = `
            INSERT INTO Games (title, description, did, price, publish_date) 
            VALUES (?, ?, ?, ?, ?)
        `;

        await executeQuery(gameInsertQuery, [title, description, did, price, publishDate]);

        const getGameQuery = `
            SELECT * FROM Games
            WHERE title = ? AND did = ? AND publishDate = ?;
        `;

        const game = await executeQuery(getGameQuery, [title, did, publishDate]) as Game;


        // Step 2: Add the game photo using addGameImage
        await addGameCoverImage({ photo, gid: game.gid, title: title, publish_date: publishDate });

        return { status: "success", message: "Game and its cover photo inserted successfully!" };
    } catch (error) {
        console.error("Error inserting game and photo:", error);
        return { status: "error", message: "An unexpected error occurred while inserting the game and its photo." };
    }
};

export default insertGame;
