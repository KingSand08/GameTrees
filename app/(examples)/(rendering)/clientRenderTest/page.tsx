/***
 * USE THIS FILE AS REFERENCE FOR RENDERING GAMES OR OTHER RESULT PAGES
 * *NOTE: SERVER SIDE IS FASTER THAN CLIENT SIDE (THIS FILE IS SLOWER BUT INTERACTABLE BY USER)
 */


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"
import imageStyle from "@/app/(examples)/ui/style/userImageStyle"

// Define a type for the user data
interface User {
    login: string;
    avatar_url: string;
}

const Page = () => {
    const [user, setUser] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("https://api.github.com/users");
            const data: User[] = await response.json(); // Type the fetched data
            setUser(data);
        };

        fetchUsers(); // Call the async function
    }, []);
    return (
        <>
            <h2>Client Side Rendering Example</h2>
            <h3>Fetching User Information</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user) => (
                        <tr key={user.login}>
                            <td>{user.login}</td>
                            <td>
                                <Image
                                    src={user.avatar_url}
                                    alt="pic not found"
                                    width={100}
                                    height={100}
                                    quality={10} // can adjust for better quality, but 75 is default
                                    style={imageStyle}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    )
}

export default Page;