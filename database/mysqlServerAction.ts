"use server";

import { revalidatePath } from "next/cache";
import executeQuery from "./myslqdb";
import { ResultSetHeader } from "mysql2";

const MysqlServerAction = async (prevState: unknown, formData: { get: (arg0: string) => unknown; }) => {
  const username = formData.get("username");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const subBtn = formData.get("submit");
  if (subBtn === "insert") {
    if (username != "" && name != "" && email != "" && password != "") {
      const result = await executeQuery(
        "INSERT INTO Test VALUES (?, ?, ?)",
        [
          username,
          name,
          email,
          password,
        ]);
      if ((result as ResultSetHeader).affectedRows) {
        revalidatePath("/CURDMySQL");
        return { message: "Record Inserted" };
      } else {
        revalidatePath("/CURDMySQL");
        return { message: "Record Insertion Failed" };
      }
    } else {
      revalidatePath("/CURDMySQL");
      return { message: "Field cannot be empty" };
    }
  }
};

export default MysqlServerAction;
