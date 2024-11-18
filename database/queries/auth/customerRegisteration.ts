"use server";

import { revalidatePath } from "next/cache";
import executeQuery from "../../mysqldb";
import { ResultSetHeader } from "mysql2";
import { checkFieldAlreadyExists } from "../user/checkFieldAlreadyExists";


const CustomerRegistration = async (prevState: unknown, formData: { get: (arg0: string) => unknown; }) => {
    const username = formData.get("username");
    const fname = formData.get("name");
    const email = formData.get("email");
    const dob = formData.get("date");
    const phone = formData.get("tel");
    const password = formData.get("password");

    // Ensure only non-empty fields
    if (username != "") {
        const isUsernameTaken = await checkFieldAlreadyExists('Users', 'Username', username as string);
        if (isUsernameTaken) {
            revalidatePath("/signup");
            return { status: "error", message: "Username is already in use by another account" };
        }
    } else if ((username as string).length > 25) {
        revalidatePath("/signup");
        return { status: "error", message: "Username can only be 25 characters long" };
    }
    // Check if email already exists for a different user
    if (email != "" && email) {
        const isEmailTaken = await checkFieldAlreadyExists('Users', 'Email', email as string);
        if (isEmailTaken) {
            revalidatePath("/signup");
            return { status: "error", message: "Email is already in use by another account" };
        }
    }
    if ((password as string).length < 8) {
        revalidatePath("/signup");
        return { status: "error", message: "Password must be more then 8 numbers long" };
    }

    if (username != "" && fname != "" && email != "" && dob != "" && password != "") {

        const result = await executeQuery(
            "INSERT INTO Users(Username, Name, Email, DOB, Phone, Password) VALUE (?, ?, ?, ?, ?, ?)",
            [
                username,
                fname,
                email,
                dob,
                phone,
                password,
            ]);
        if ((result as ResultSetHeader).affectedRows) {
            revalidatePath("/signup");
            await executeQuery(
                "INSERT INTO Customers(UID) SELECT U.UID FROM Users U WHERE U.Username = ?;",
                [username]
            );

            return { status: "success", message: "Signup Successful! Loggining you in..." };
        } else {
            revalidatePath("/signup");
            return { status: "error", message: "Record Insertion Failed" };
        }
    } else {
        revalidatePath("/signup");
        return { status: "error", message: "Field cannot be empty" };
    }

}

export default CustomerRegistration;
