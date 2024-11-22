import executeQuery from "@/database/mysqldb";
import generatePhotoPid from "@/utils/generatePhotoId";

type InsertResult = {
    pid: number;
    affectedRows: number;
};

type GameImageData = {
    photo: Buffer;
    gid: number;
    title: string;
    publish_date: string;
};

export const addGameCoverImage = async (imageData: GameImageData): Promise<{ status: string; message: string }> => {
    const { photo, gid, title, publish_date } = imageData;

    const pid = generatePhotoPid(`${gid}-${title}-${publish_date}`);

    try {
        const photoInsertQuery = `
            INSERT INTO Photos (pid, add_date)
            VALUES (pid, NOW())
        `;
        await executeQuery(photoInsertQuery, [pid]);

        const gamePhotoInsertQuery = `
            INSERT INTO GamePhotos (gpid, gid, img, type)
            VALUES (?, ?, ?, 'cover')
        `;
        const gamePhotoData = [pid, gid, photo];

        await executeQuery(gamePhotoInsertQuery, gamePhotoData);

        return { status: "success", message: "Photo linked to the game successfully!" };
    } catch (error) {
        console.error("Error adding game image:", error);
        return { status: "error", message: "An unexpected error occurred while adding the game image." };
    }
};

export const addGameContentImage = async (imageData: GameImageData): Promise<{ status: string; message: string }> => {
    const { photo, gid } = imageData;

    try {
        // Step 1: Insert into the photos table
        const photoInsertQuery = `
            INSERT INTO Photos (add_date) 
            VALUES (NOW())
        `;
        const photoResult = (await executeQuery(photoInsertQuery, [])) as InsertResult;

        // Check if the photo record was successfully inserted
        if (!photoResult.pid || photoResult.affectedRows === 0) {
            return { status: "error", message: "Failed to insert photo record." };
        }

        const photoId = photoResult.pid;

        // Step 2: Insert into the gamephotos table
        const gamePhotoInsertQuery = `
            INSERT INTO GamePhotos (gpid, gid, img, type)
            VALUES (?, ?, ?, 'content')
        `;
        const gamePhotoData = [photoId, gid, photo];

        const gamePhotoResult = (await executeQuery(gamePhotoInsertQuery, gamePhotoData)) as InsertResult;

        // Check if the photo was successfully linked
        if (gamePhotoResult.affectedRows === 0) {
            return { status: "error", message: "Failed to link the photo to the game." };
        }

        return { status: "success", message: "Photo linked to the game successfully!" };
    } catch (error) {
        console.error("Error adding game image:", error);
        return { status: "error", message: "An unexpected error occurred while adding the game image." };
    }
};
