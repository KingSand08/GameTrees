import Avatar from "../auth/Avatar";
import Link from "next/link";
import { processUserImages } from "@/utils/processImages";
import { getAllUsersWithPhotos } from "@/database/queries/user/getAllUsers";

const DisplayUserData = async (): Promise<JSX.Element> => {
  // Fetch all users with photos
  const allUsersRaw = await getAllUsersWithPhotos();
  // Process user images to Base64
  const users = await processUserImages(allUsersRaw);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col space-y-8">
        <h3 className="text-center text-2xl">User Information</h3>
        <table className="table">
          <thead>
            <tr className="bg-blue-500 text-white rounded-full">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Avatar</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UID}>
                <td className="px-6 py-3">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className="px-6 py-3">
                  <Link href={`/users/${user.Username}/wishlist`}>
                    <Avatar
                      image={user.Image}
                      username={user.Username}
                      imgSize="w-12"
                      areaExpand="3rem"
                    />
                  </Link>
                </td>
                <td className="px-6 py-3">{user.UID}</td>
                <td className="px-6 py-3">{user.Username}</td>
                <td className="px-6 py-3">{user.Name}</td>
                <td className="px-6 py-3">{user.Email}</td>
                <td className="px-6 py-3">{user.Password}</td>
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
