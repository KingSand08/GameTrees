export interface User {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    hashedPassword?: string;
    createdAt: Date;
    updatedAt: Date;
}
