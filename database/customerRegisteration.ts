"use server";

import { revalidatePath } from "next/cache";
import executeQuery from "./mysqldb";
import { ResultSetHeader } from "mysql2";
import { checkFieldAlreadyExists } from "./checkFieldAlreadyExists";

const CustomerRegistration = async (prevState: unknown, formData: { get: (arg0: string) => unknown; }) => {
    const username = formData.get("username");
    const fname = formData.get("name");
    const email = formData.get("email");
    const dob = formData.get("date");
    const phone = formData.get("tel");
    const password = formData.get("password");

    // Ensure only non-empty fields
    if (username != "") {
        const isUsernameTaken = await checkFieldAlreadyExists('Customer', 'username', username as string);
        console.log(`userName:${username}`)
        console.log(`isUsernameTaken:${isUsernameTaken}`)
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
        const isEmailTaken = await checkFieldAlreadyExists('Customer', 'email', email as string);

        if (isEmailTaken) {
            revalidatePath("/signup");
            return { status: "error", message: "Email is already in use by another account" };
        }
    }


    if ((password as string).length < 8) {
        revalidatePath("/signup");
        return { status: "error", message: "Password must be more then 8 numbers long" };
    }

    // return { status: "error", message: "TEST WORKS!" };
    if (username != "" && fname != "" && email != "" && dob != "" && phone != "" && password != "") {
        console.log(`Username: ${username}, Name: ${fname}, Email: ${email}, Password: ${password}`);
        const result = await executeQuery(
            "INSERT INTO Customer (username, full_name, email, date_of_birth, mobile_phone, password) VALUE (?, ?, ?, ?, ?, ?)",
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
            return { status: "success", message: "Record Inserted" };
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
