import executeQuery from "@/database/mysqldb";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
}

const DisplayUserData = async (): Promise<JSX.Element> => {
  const result = (await executeQuery("SELECT * FROM Test", [])) as User[];

  return (
    <>
      <div className="flex flex-col space-y-8">
        <h3 className="text-center text-2xl">User Information</h3>
        <table className="text-center table table-dark">
          <thead className="table-warning">
            <tr className="bg-blue-500 text-white">
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">User Type</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3">User Password</th>
            </tr>
          </thead>
          <tbody>
            {result.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.password}</td>
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
