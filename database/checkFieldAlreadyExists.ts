import executeQuery from "./mysqldb";

// General function to check if a field (email or username) exists for another user
export const checkFieldAlreadyExists = async (
    field: 'email' | 'username',
    value: string,
): Promise<boolean> => {
    const existingCheck = await executeQuery(
        `SELECT * FROM Test WHERE ${field} = ?`,
        [value]
    ) as Array<{ id: number; username: string; name: string; email: string; password: string }>;

    return existingCheck.length > 0; // Returns true if the field exists for a different user
};
