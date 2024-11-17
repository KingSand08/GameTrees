import { User } from "@/types/models/User";
import blobToBase64 from "@/utils/blobToBase64";

// Define a more specific type for the incoming users
interface UserWithPhoto extends User {
    Photo: Buffer | null;
}

/**
 * Process user images, converting binary Photo data to Base64 strings.
 * @param users - An array of users with Photo data.
 * @returns A promise resolving to an array of processed users.
 */
export const processUserImages = async (users: UserWithPhoto[]): Promise<User[]> => {
    const processedUsers = await Promise.all(
        users.map(async (user) => ({
            ...user,
            Image: user.Photo ? await blobToBase64(user.Photo) : null,
        }))
    );
    return processedUsers as User[];
};
