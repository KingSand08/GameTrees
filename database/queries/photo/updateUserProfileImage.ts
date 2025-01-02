import executeQuery from "@/database/mysqldb";
import generatePhotoPid from "@/utils/generatePhotoId";

/**
 * Update the user image in the database.
 * @param userId - The ID of the user.
 * @param imageData - The binary data of the image.
 */
export async function updateUserAccountImage(userId: number, imageData: Buffer): Promise<void> {
    const pid = generatePhotoPid(userId);
    // console.log(pid)
    const photoInsertQuery = `
            INSERT INTO Photos (pid, add_date) 
            VALUES (?, NOW())
            ON DUPLICATE KEY UPDATE add_date = NOW();
        `;
    // Insert into Photos
    await executeQuery(photoInsertQuery, [pid]);

    const accPhotoInsertQuery = `
            INSERT INTO AccPhotos (apid, image, uid) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE image = VALUES(image), uid = VALUES(uid);
        `;

    // Insert into Acc_Photos
    await executeQuery(accPhotoInsertQuery, [pid, imageData, userId]);
}

export default updateUserAccountImage;