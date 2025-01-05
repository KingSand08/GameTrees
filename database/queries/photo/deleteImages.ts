import executeQuery from "@/database/mysqldb";

/**
 * Delete the images in the database.
 * @param photoIds - The photo ID array.
 */
export async function deleteImages(photoIds: number[]): Promise<void> {
    try {
        const placeholders = photoIds.map(() => "?").join(", ");
        
        const deleteQuery = `
            DELETE FROM Photos
            WHERE pid IN (${placeholders});
        `;

        await executeQuery(deleteQuery, photoIds);
    }
    catch (error) {
        console.error("Error deleting images:", error);
        throw error;
    }
}

export default deleteImages;