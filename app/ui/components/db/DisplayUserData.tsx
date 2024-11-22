import Avatar from "../auth/Avatar";
import Link from "next/link";
import { User } from "@/types/models/User";
import generatePhotoPid from "@/utils/generatePhotoId";

type DisplayUserDataProps = {
  currentUsername: string;
  users: User[];
};

const DisplayUserData: React.FC<DisplayUserDataProps> = ({ currentUsername, users }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col space-y-8">
        <h3 className="text-center text-2xl">User Information</h3>
        <table className="table">
          <thead>
            <tr className="bg-blue-700 text-white text-center">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Avatar</th>
              <th>User ID</th>
              <th>Role</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className="text-center">
                <td className="px-6 py-3">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className="px-6 py-3">
                  <Link href={`/users/${user.username}/wishlist`}>
                    <Avatar
                      image={user.image ?? undefined}
                      className={`${currentUsername === user.username ?
                        "ring-2 ring-offset-base-100 ring-offset-2 ring-purple-700" : ""}`}
                      username={user.username}
                      size="5em"
                      textSize="text-2xl"
                    />
                  </Link>
                </td>
                <td className="px-6 py-3">{user.uid}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-8" />
    </div>
  );
};

export default DisplayUserData;
