import executeQuery from "@/database/mysqldb";
import generatePhotoPid from "@/utils/generatePhotoId";
import Game from "@/types/models/Game";


export const addGameCoverImage = async (game: Game, photo: Buffer): Promise<{ status: string; message: string }> => {
    const { gid } = game;

    const pid = generatePhotoPid(`${gid}-${game.title}-${game.publish_date}`);

    try {
        const photoInsertQuery = `
            INSERT INTO Photos (pid, add_date)
            VALUES (?, NOW())
            ON DUPLICATE KEY UPDATE add_date = NOW();
        `;
        await executeQuery(photoInsertQuery, [pid]);

        const gamePhotoInsertQuery = `
            INSERT INTO GamePhotos (gpid, image, gid, type)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                image = VALUES(image),
                type = VALUES(type);
        `;

        await executeQuery(gamePhotoInsertQuery, [pid, photo, gid, "cover"]);

        return { status: "success", message: "Photo linked to the game successfully!" };
    } catch (error) {
        console.error("Error adding game image:", error);
        return { status: "error", message: "An unexpected error occurred while adding the game image." };
    }
};

export const addGameContentImage = async (game: Game, photo: Buffer): Promise<{ status: string; message: string }> => {
    const { gid } = game;

    const pid = generatePhotoPid(`${gid}-${game.title}-${game.publish_date}`);

    try {
        const photoInsertQuery = `
            INSERT INTO Photos (pid, add_date)
            VALUES (?, NOW())
            ON DUPLICATE KEY UPDATE add_date = NOW();
        `;
        await executeQuery(photoInsertQuery, [pid]);

        const gamePhotoInsertQuery = `
            INSERT INTO GamePhotos (gpid, image, gid, type)
            VALUES (?, ?, ?, ?)
        `;

        await executeQuery(gamePhotoInsertQuery, [pid, photo, gid, "content"]);

        return { status: "success", message: "Photo linked to the game successfully!" };
    } catch (error) {
        console.error("Error adding game image:", error);
        return { status: "error", message: "An unexpected error occurred while adding the game image." };
    }
};