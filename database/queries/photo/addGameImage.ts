import executeQuery from "@/database/mysqldb";

/**
 * Update the user image in the database.
 * @param userId - The ID of the user.
 * @param imageData - The binary data of the image.
 */
export async function addGameImage(devId: string, photoId: string, title: string, imageData: Buffer): Promise<void> {
    const insertContentQuery = `
            INSERT INTO Contents (Content_ID, Text_Desc)
            VALUES (?, NULL)
            ON DUPLICATE KEY UPDATE Content_ID = VALUES(Content_ID);
        `;

    const insertPhotoQuery = `
            INSERT INTO Photos (Photo_ID, Image, DateAdded)
            VALUES (?, ?, CURRENT_DATE)
            ON DUPLICATE KEY UPDATE
                Image = VALUES(Image),
                DateAdded = VALUES(DateAdded);
        `;

    const linkPhotoQuery = `
            INSERT INTO Game_Photos (Photo_ID, Dev_ID, Title)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
                Dev_ID = VALUES(Dev_ID),
                Title = VALUES(Title);
        `;

    // Ensure a record exists in Contents
    await executeQuery(insertContentQuery, [photoId]);

    // Insert into Photos
    await executeQuery(insertPhotoQuery, [photoId, imageData]);

    // Insert into Game_Photos
    await executeQuery(linkPhotoQuery, [photoId, devId, title]);
}