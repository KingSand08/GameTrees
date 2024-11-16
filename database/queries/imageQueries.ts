import executeQuery from "@/database/mysqldb";

/**
 * Update the user image in the database.
 * @param userId - The ID of the user.
 * @param imageData - The binary data of the image.
 */
export async function updateUserImage(userId: number, imageData: Buffer): Promise<void> {
    const query = "UPDATE Users SET Image = ? WHERE UID = ?";
    const values = [imageData, userId];
    await executeQuery(query, values);
}

/**
 * Get the user's image from the database.
 * @param userId - The ID of the user.
 * @returns The user's image as a Buffer, or null if not found.
 */
export async function getUserImage(userId: number): Promise<Buffer | null> {
    const query = "SELECT Image FROM Users WHERE UID = ?";
    const values = [userId];

    const result = (await executeQuery(query, values)) as { Image?: Buffer }[];

    if (result.length > 0 && result[0].Image) {
        return result[0].Image;
    }

    return null;
}
