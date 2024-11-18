import crypto from "crypto";

/**
 * Verify a password by comparing it to a stored hash.
 * @param password - The plain text password to verify.
 * @param hash - The stored hash.
 * @param salt - The stored salt.
 * @returns Whether the password matches the hash.
 */
export const verifyPassword = (
    password: string,
    hash: string,
    salt: string
): boolean => {
    const computedHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return computedHash === hash; // Compare hashes
};

export default verifyPassword;