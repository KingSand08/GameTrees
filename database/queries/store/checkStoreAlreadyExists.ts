import executeQuery from "@/database/mysqldb";

// General function to check if a field (email or username) exists for another user
export const checkStoreAlreadyExists = async (
    store_name: string,
    street: string,
    city: string,
    state: string,
    zip: number | string,
    country: string,
): Promise<boolean> => {
    const existingCheck = await executeQuery(`
        SELECT * FROM Stores 
        WHERE store_name = ? 
            AND street = ? 
            AND city = ? 
            AND State = ? 
            AND Country = ?;
            `,
        [store_name, street, city, state, country]
    ) as Array<{ sid: number; }>;

    return existingCheck.length > 0;
};

