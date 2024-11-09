import executeQuery from "@/database/myslqdb";

const DisplayUserData = async () => {
  const result = await executeQuery("SELECT * FROM Test", []);

  return (
    <div className="flex flex-col space-y-8">
      <h3 className="text-center text-2xl">User Information</h3>
      <table className="text-center table table-dark">
        <thead className="table-warning">
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>User Type</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {result.map((user) => (
            <tr className="table-warning" key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {JSON.stringify(result)} */}
    </div>
  );
};

export default DisplayUserData;
