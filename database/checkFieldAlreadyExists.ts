import executeQuery from "./mysqldb";

// General function to check if a field (email or username) exists for another user
export const checkFieldAlreadyExists = async (
    table: string,
    field: 'Email' | 'Username',
    value: string,
): Promise<boolean> => {
    const existingCheck = await executeQuery(
        `SELECT * FROM ${table} WHERE ${field} = ?`,
        [value]
    ) as Array<{ id: number; username: string; name: string; email: string; password: string }>;

    return existingCheck.length > 0; // Returns true if the field exists for a different user
};

