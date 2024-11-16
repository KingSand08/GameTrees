import { User } from "@/types/models/User";
import blobToBase64 from "@/utils/blobToBase64";

export const processUserImages = (users: any[]): User[] => {
    return users.map((user) => ({
        ...user,
        Image: user.Image ? blobToBase64(user.Image) : null,
    })) as User[];
};
