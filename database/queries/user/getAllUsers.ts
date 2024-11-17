import executeQuery from "@/database/mysqldb";
import { User } from "@/types/models/User";

/**
 * Get all users along with their associated photos.
 * @returns An array of users with only user details.
 */
export const getAllUsers = async (): Promise<(User)[]> => {

    const result = (await executeQuery("SELECT * FROM Users", [])) as User[];
    return result;
}

/**
 * Get all users along with their associated photos.
 * @returns An array of users with both user and photo details.
 */
export const getAllUsersWithPhotos = async (): Promise<(User & { Photo: Buffer | null })[]> => {
    const query = `
        SELECT 
            u.UID,
            u.Username,
            u.Password,
            u.Name,
            u.DOB,
            u.Phone,
            u.Email,
            p.Image AS Photo
        FROM Users u
        LEFT JOIN Acc_Photos ap ON u.UID = ap.UID
        LEFT JOIN Photos p ON ap.Photo_ID = p.Photo_ID;
    `;

    const result = (await executeQuery(query, [])) as (User & { Photo: Buffer | null })[];
    return result;
};

