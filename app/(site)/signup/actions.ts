import { mysqlConn } from "@/database/mysqlConnection";
// import { hash } from "@node-rs/argon2";
import bcrypt from "bcrypt"; // Use bcrypt instead of argon2
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { ActionResult } from "next/dist/server/app-render/types";

export default async function Page() { }

export async function signup(_: unknown, formData: FormData): Promise<ActionResult> {
    "use server";
    const username = formData.get("username");
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        return {
            error: "Invalid username"
        };
    }
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        };
    }

    // const passwordHash = await hash(password, {
    //     // recommended minimum parameters
    //     memoryCost: 19456,
    //     timeCost: 2,
    //     outputLen: 32,
    //     parallelism: 1
    // });
    // const userId = generateIdFromEntropySize(10); // 16 characters long

    const saltRounds = 10; // bcrypt salt rounds
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const userId = generateIdFromEntropySize(10);


    // TODO: check if username is already used
    // await db.table("user").insert({
    //     id: userId,
    //     username: username,
    //     password_hash: passwordHash
    // });
    const existingUser = await mysqlConn.selQuery('SELECT * FROM user WHERE username = ?', [username]);
    if (existingUser.length > 0) {
        return {
            error: "Username already taken"
        };
    }

    // Insert the new user
    await mysqlConn.exQuery("INSERT INTO user (id, username, password_hash) VALUES (?, ?, ?)", [userId, username, passwordHash]);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}
