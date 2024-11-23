import crypto from "crypto";

/**
 * Generate a hash-based ID for the Photos table.
 * This function supports both numeric and composite string inputs for generating unique IDs.
 * @param input - The data to hash (e.g., userId or composite data for games).
 * @returns A unique integer hash for use as `pid`.
 */
export default function generatePhotoPid(input: number | string): number {
    // Ensure input is a string for hashing
    const inputStr = typeof input === "number" ? input.toString() : input;

    // Generate SHA256 hash and truncate to a 32-bit integer
    const hash = crypto.createHash("sha256").update(inputStr).digest("hex");
    return parseInt(hash.slice(0, 8), 16); // Convert first 8 hex characters to an integer
}
