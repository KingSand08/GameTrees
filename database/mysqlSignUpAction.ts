"use server";

import { revalidatePath } from "next/cache";
import executeQuery from "./myslqdb";
import { ResultSetHeader } from "mysql2";
import { checkEmailExists } from "./checkEmailExists";

// Define the structure of the expected row from the query result
interface UserData {
  email: string;
  name: string;
  password: string;
}

const MysqlSignUpAction = async (prevState: unknown, formData: { get: (arg0: string) => unknown; }) => {
  const username = formData.get("username");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const subBtn = formData.get("submit");

  const currentData = await executeQuery(
    "SELECT email, name, password FROM Test WHERE username = ?",
    [username]
  ) as UserData[];

  const currentEmail = currentData[0]?.email;
  const currentName = currentData[0]?.name;
  const currentPassword = currentData[0]?.password;


  // Insertion Method
  if (subBtn === "insert") {
    if (username != "" && name != "" && email != "" && password != "") {
      const result = await executeQuery(
        "UPDATE Test SET username=?, name=?, email=?, password=? WHERE username=?",
        [
          username,
          name,
          email,
          password,
        ]);
      if ((result as ResultSetHeader).affectedRows) {
        revalidatePath("/CURDMySQL");
        return { status: "success", message: "Record Inserted" };
      } else {
        revalidatePath("/CURDMySQL");
        return { status: "error", message: "Record Insertion Failed" };
      }
    } else {
      revalidatePath("/CURDMySQL");
      return { status: "error", message: "Field cannot be empty" };
    }

    // Update Method
  } else if (subBtn === "update") {
    // Construct dynamic SET clause based on non-empty fields
    const setClause: string[] = [];
    const values: unknown[] = [];

    // Ensure only non-empty fields
    if (username != "") {
      setClause.push("username = ?");
      values.push(username);
    }
    if (name != "") {
      if (name === currentName) {
        return { status: "error", message: "New Name is the same as current." };
      }
      setClause.push("name = ?");
      values.push(name);
    }
    // Check if email already exists for a different user
    if (email != "" && email !== currentEmail) {
      const emailStr = email as string;
      const usernameStr = username as string;

      const emailExists = await checkEmailExists(emailStr, usernameStr);

      if (emailExists) {
        revalidatePath("/CURDMySQL");
        return { status: "error", message: "Email is already in use by another account" };
      } else {
        setClause.push("email = ?");
        values.push(email);
      }
    } else if (email === currentEmail) {
      return { status: "error", message: "New Email is the same as current." };
    }
    if (password != "") {
      if (password === currentPassword) {
        return { status: "error", message: "New Password is the same as current." };
      }
      setClause.push("password = ?");
      values.push(password);
    }

    // Check if there are any updates to make
    if (setClause.length > 1) {
      if (username != "") {
        const query = `UPDATE Test SET ${setClause.join(", ")} WHERE username = ?`;
        // This assumes username is the unique key
        values.push(username);

        const result = await executeQuery(query, values);

        if ((result as ResultSetHeader).affectedRows) {
          revalidatePath("/CURDMySQL");
          return { status: "success", message: "Record Updated" };
        } else {
          revalidatePath("/CURDMySQL");
          return { status: "error", message: "Record Update Failed" };
        }
      } else {
        revalidatePath("/CURDMySQL");
        return { status: "error", message: "Username cannot be left blank" };
      }
    } else {
      revalidatePath("/CURDMySQL");
      return { status: "error", message: "No fields to update" };
    }
  }
};

export default MysqlSignUpAction;
