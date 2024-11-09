import executeQuery from "./myslqdb";

// Function to check if the email already exists for another user
export const checkEmailExists = async (email: string, username: string): Promise<boolean> => {
    const existingEmailCheck = await executeQuery(
        "SELECT * FROM Test WHERE email = ? AND username != ?",
        [email, username]
    ) as Array<{ id: number; username: string; name: string; email: string; password: string }>;

    // Log for debugging
    console.log(existingEmailCheck.length > 0);

    return existingEmailCheck.length > 0; // Returns true if the email exists for a different user
};
