import executeQuery from "@/database/mysqldb";

interface User {
  UID: number;
  Username: string;
  Name: string;
  Email: string;
  Password: string;
}

const DisplayUserData = async (): Promise<JSX.Element> => {
  const result = (await executeQuery("SELECT * FROM Users", [])) as User[];

  return (
    <>
      <div className="flex flex-col space-y-8">
        <h3 className="text-center text-2xl">User Information</h3>
        <table className="text-center table table-dark">
          <thead className="table-warning">
            <tr className="bg-blue-500 text-white">
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Password</th>
            </tr>
          </thead>
          <tbody>
            {result.map((user) => (
              <tr key={user.UID}>
                <td className="px-6 py-3">{user.UID}</td>
                <td className="px-6 py-3">{user.Username}</td>
                <td className="px-6 py-3">{user.Name}</td>
                <td className="px-6 py-3">{user.Email}</td>
                <td className="px-6 py-3">{user.Password}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {JSON.stringify(result)} */}
      </div>
      <div className="p-8" />
    </>
  );
};

export default DisplayUserData;
