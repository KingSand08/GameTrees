export type User = {
    uid: string;
    username: string;
    password?: string;
    name: string;
    lastname: string;
    dob?: string;
    phone?: string;
    email: string;
    image?: string | null;
    role: string;
};

export default User;