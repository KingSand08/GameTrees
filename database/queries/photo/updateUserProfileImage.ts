import executeQuery from "@/database/mysqldb";

/**
 * Update the user image in the database.
 * @param userId - The ID of the user.
 * @param imageData - The binary data of the image.
 */
export async function updateUserAccountImage(userId: number, imageData: Buffer): Promise<void> {
    const photoId = `AP${userId}`;


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
            INSERT INTO Acc_Photos (Photo_ID, UID)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE
                UID = VALUES(UID);
        `;

    // Ensure a record exists in Contents
    await executeQuery(insertContentQuery, [photoId]);

    // Insert into Photos
    await executeQuery(insertPhotoQuery, [photoId, imageData]);

    // Insert into Acc_Photos
    await executeQuery(linkPhotoQuery, [photoId, userId]);
}