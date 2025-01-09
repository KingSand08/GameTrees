import executeQuery from "@/database/mysqldb"


export async function getStoreIdFromUserId(user_id: number | null): Promise<number[] | null> {
  if (user_id === null) {
    console.error("Cannot accept null userID");
  }  
  const query = `
            SELECT
              S.sid
            FROM Stores S
            WHERE S.mid = ?;
        `;

    // Execute the query
    const results = (await executeQuery(query, [user_id])) as number[] | null;

    return results;
}

export default getStoreIdFromUserId;