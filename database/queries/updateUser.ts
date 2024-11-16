import executeQuery from "@/database/mysqldb";

/**
 * Update user details in the database.
 * @param userId User's ID
 * @param updateData Fields to update
 * @returns Boolean indicating success or failure
 */
export const updateUserDetails = async (userId: number, updateData: Record<string, any>): Promise<boolean> => {
    try {
        const fields = Object.keys(updateData)
            .map((key) => `${key} = ?`)
            .join(", ");
        const values = Object.values(updateData);

        const query = `UPDATE Users SET ${fields} WHERE UID = ?`;

        // Run the query using executeQuery
        const result: any = await executeQuery(query, [...values, userId]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating user details:", error);
        return false;
    }
};

/**
 * Update the user image in the database.
 * @param userId - The ID of the user.
 * @param imageData - The binary data of the image.
 */
export async function updateUserImage(userId: number, imageData: Buffer): Promise<void> {
    const query = "UPDATE Users SET Image = ? WHERE UID = ?";
    const values = [imageData, userId];
    await executeQuery(query, values);
};