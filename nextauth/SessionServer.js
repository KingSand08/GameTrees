"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";

const SessionServer = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div>
      <h3 className="text-2xl">Server Component for NextAuth Session</h3>
      {JSON.stringify(session)}
      {session.user.username}
    </div>
  );
};

export default SessionServer;
