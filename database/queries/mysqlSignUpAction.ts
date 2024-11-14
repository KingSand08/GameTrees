"use server";

import { revalidatePath } from "next/cache";
import executeQuery from "../mysqldb";
import { ResultSetHeader } from "mysql2";
import { checkFieldAlreadyExists } from "./checkFieldAlreadyExists";

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

  // Construct dynamic SET clause based on non-empty fields
  const setClause: string[] = [];
  const values: unknown[] = [];

  const currentData = await executeQuery(
    "SELECT * FROM Test WHERE username = ?",
    [username]
  ) as UserData[];

  const currentEmail = currentData[0]?.email;
  const currentName = currentData[0]?.name;
  const currentPassword = currentData[0]?.password;


  if (subBtn === "insert") { // Insertion Method
    // Ensure only non-empty fields
    if (username != "") {
      const isUsernameTaken = await checkFieldAlreadyExists('Test', 'Username', username as string);
      console.log(`userName:${username}`)
      console.log(`isUsernameTaken:${isUsernameTaken}`)
      if (isUsernameTaken) {
        revalidatePath("/CURDMySQL");
        return { status: "error", message: "Username is already in use by another account" };
      }
    }
    // Check if email already exists for a different user
    if (email != "" && email !== currentEmail) {
      const isEmailTaken = await checkFieldAlreadyExists('Test', 'Email', email as string);

      if (isEmailTaken) {
        revalidatePath("/CURDMySQL");
        return { status: "error", message: "Email is already in use by another account" };
      }
    } else if (email === currentEmail) {
      return { status: "error", message: "New Email is the same as current." };
    }
    if (username != "" && name != "" && email != "" && password != "") {
      console.log(`Username: ${username}, Name: ${name}, Email: ${email}, Password: ${password}`);
      const result = await executeQuery(
        "INSERT INTO Test (username, name, email, password) VALUE (?, ?, ?, ?)",
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

  } else if (subBtn === "update") { // Update Method
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
      const isEmailTaken = await checkFieldAlreadyExists('Test', 'Email', email as string);

      if (isEmailTaken) {
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

  else if (subBtn === "delete") { // Deletion Method
    if (username != "") {
      const result = await executeQuery(
        "DELETE FROM Test WHERE username=?",
        [username]);
      if ((result as ResultSetHeader).affectedRows) {
        revalidatePath("/CURDMySQL");
        return { status: "success", message: "Record Deleted" };
      } else {
        revalidatePath("/CURDMySQL");
        return { status: "error", message: "Record Deletion Failed" };
      }
    } else {
      revalidatePath("/CURDMySQL");
      return { status: "error", message: "Field cannot be empty" };
    }
  };
}

export default MysqlSignUpAction;
