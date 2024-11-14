/***
 * USE THIS FILE AS REFERENCE FOR RENDERING GAMES OR OTHER RESULT PAGES
 * *NOTE: SERVER SIDE IS FASTER THAN CLIENT SIDE (THIS FILE IS FASTER BUT NOT INTERACTABLE BY USER)
 */

import Image from "next/image";


// Define a type for the user data
interface User {
    login: string;
    avatar_url: string;
}



const Page = async () => {
    const usersData = await fetch("https://api.github.com/users");
    const users = await usersData.json();


    return (
        <>
            <h2>Server Side Rendering Example</h2>
            <h3>Fetching User Information</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => (
                        <tr key={user.login}>
                            <td>{user.login}</td>
                            <td>
                                <Image
                                    src={user.avatar_url}
                                    alt="pic not found"
                                    width={100}
                                    height={100}
                                    quality={100}  // can adjust for better quality, but 75 is default
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