import executeQuery from "@/database/mysqldb";
import { v4 as uuidv4 } from "uuid";
import { addGameImage } from "../photo/addGameImage";


interface InsertGameInput {
    title: string;
    price: number;
    devId: string;
    imageBuffer: Buffer;
}

export async function insertGame({ title, price, devId, imageBuffer }: InsertGameInput): Promise<void> {
    const photoId = uuidv4().substring(0, 10); // Generate a unique Photo_ID //! NEEDS TO CHANGE ASAP

    try {
        // Insert the game into Games table
        const gameQuery = `
            INSERT INTO Games (Title, Dev_ID, Price)
            VALUE (?, ?, ?);
        `;
        await executeQuery(gameQuery, [title, devId, price]);

        await addGameImage(devId, photoId, title, imageBuffer);
    } catch (error) {
        console.error("Error inserting game:", error);
        throw new Error("Failed to insert game");
    }
}
