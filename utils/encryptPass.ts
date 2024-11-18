import crypto from "crypto";

/**
 * Hash a password using PBKDF2.
 * @param password - The plain text password to hash.
 * @returns The hashed password with salt.
 */
export const hashPassword = (password: string): { salt: string; hash: string } => {
    const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"); // Hash the password
    return { salt, hash };
};

export default hashPassword;