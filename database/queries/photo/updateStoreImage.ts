import executeQuery from "@/database/mysqldb";
import generatePhotoPid from "@/utils/generatePhotoId";

/**
 * Update the user image in the database.
 * @param storeId - The ID of the store.
 * @param imageData - The binary data of the image.
 */
export async function updateStoreImage(storeId: number, imageData: Buffer): Promise<void> {
    const dayCode = new Date().getTime();
    const code = dayCode * 10 + storeId; 
    const pid = generatePhotoPid(code);
    // console.log(pid)
    const photoInsertQuery = `
            INSERT INTO Photos (pid, add_date) 
            VALUES (?, NOW())
            ON DUPLICATE KEY UPDATE add_date = NOW();
        `;
    // Insert into Photos
    await executeQuery(photoInsertQuery, [pid]);

    const storePhotoInsertQuery = `
            INSERT INTO StorePhotos (spid, image, sid) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE image = VALUES(image), sid = VALUES(sid);
        `;

    // Insert into Acc_Photos
    await executeQuery(storePhotoInsertQuery, [pid, imageData, storeId]);
}

export default updateStoreImage;