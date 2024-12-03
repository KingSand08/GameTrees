import executeQuery from "@/database/mysqldb";
import { User } from "@/types/models/User";
import { getUserRoleByUID } from "./getUserRoleByUID";
import blobToBase64 from "@/utils/blobToBase64";

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
export const getAllUsersWithPhotos = async (): Promise<(User & { image: Buffer | null })[]> => {
    const query = `
        SELECT 
            U.uid,
            U.username,
            U.password,
            U.firstname AS name,
            U.lastname,
            U.dob,
            U.phone,
            U.email,
            AP.image
        FROM Users U
        LEFT JOIN AccPhotos AP ON U.uid = AP.uid
    `;

    const result = (await executeQuery(query, [])) as (User & { image: Buffer | null })[];
    return result;
};


/**
 * Get all users with their roles, details, and photos.
 * @returns An array of users with roles, details, and photos.
 */
export const getAllUsersWithRolesAndPhotos = async (): Promise<User[]> => {
    const query = `
        SELECT 
            U.uid,
            U.username,
            U.password,
            U.firstname AS name,
            U.lastname,
            U.dob,
            U.phone,
            U.email,
            AP.image
        FROM Users U
        LEFT JOIN AccPhotos AP ON U.uid = AP.uid
  `;

    // Fetch users and photos
    const users = (await executeQuery(query, [])) as (Omit<User, "role"> & {
        image: Buffer | null;
    })[];

    // Add roles by mapping through the users
    const usersWithRoles = await Promise.all(
        users.map(async (user) => {
            const role = await getUserRoleByUID(user.uid);
            return {
                ...user,
                role,
                image: user.image ? await blobToBase64(user.image) : null,
            };
        })
    );

    return usersWithRoles;
};

